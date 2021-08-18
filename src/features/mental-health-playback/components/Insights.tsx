import Background from '@assets/mental-health-playback/Background';
import { Card, Text, TextHighlight } from '@covid/components';
import BarChart from '@covid/features/mental-health-playback/components/BarChart';
import InsightIllustration from '@covid/features/mental-health-playback/components/InsightIllustration';
import { IInsight } from '@covid/features/mental-health-playback/types';
import i18n from '@covid/locale/i18n';
import { colors, grid, sizes, styling } from '@covid/themes';
import * as React from 'react';
import { LayoutChangeEvent, StyleSheet, useWindowDimensions, View } from 'react-native';

interface IProps {
  itemHeight: number;
  insights: IInsight[];
}

type TNumberObject = { [key: number]: number };

export default React.memo(function Insights(props: IProps) {
  const [illustrationHeights, setIllustrationHeights] = React.useState<TNumberObject>({});
  const windowWidth = useWindowDimensions().width;

  const backgroundWidth = Math.min(windowWidth, sizes.maxScreenWidth);

  function onLayoutView(event: LayoutChangeEvent, index: number) {
    setIllustrationHeights({
      ...illustrationHeights,
      [index]: Math.floor(event.nativeEvent.layout.height),
    });
  }

  if (props.itemHeight <= 0) {
    return null;
  }

  return (
    <>
      {(props.insights || []).map((insight: IInsight, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`insight-${index}`} style={{ height: props.itemHeight, justifyContent: 'space-between' }}>
          {index === 0 ? (
            <Card useShadow style={styles.card}>
              <Text>
                {i18n.t('mental-health-playback.general.explanation-card')}{' '}
                {i18n.t(`mental-health-playback.segments.${insight.segment}`, {
                  defaultValue: i18n.t('mental-health-playback.segments.general'),
                })}
              </Text>
            </Card>
          ) : null}

          {illustrationHeights[index] > 0 && illustrationHeights[index] < 100 ? null : (
            <View
              onLayout={(event: LayoutChangeEvent) => onLayoutView(event, index)}
              style={styles.illustrationWrapper}
            >
              {illustrationHeights[index] >= 100 ? (
                <>
                  <Background height={illustrationHeights[index]} preserveAspectRatio="none" width={backgroundWidth} />
                  <View style={[styling.absoluteFill, styling.centerCenter]}>
                    <InsightIllustration
                      height={illustrationHeights[index] - grid.xxl * 2}
                      type={insight.activity_name}
                    />
                  </View>
                </>
              ) : null}
            </View>
          )}

          <View style={styles.contentWrapper}>
            <TextHighlight
              color={colors.accentBlue.main.bgColor}
              query={insight.activity_name.includes('less') ? i18n.t('less') : i18n.t('more')}
              textClass="h3Regular"
            >
              {i18n.t(`mental-health-playback.insights.${insight.activity_name}.title`, {
                defaultValue: i18n.t('mental-health-playback.general.default-title'),
              })}
            </TextHighlight>
            <TextHighlight
              inverted
              color={colors.accentBlue.main.bgColor}
              colorPalette="uiDark"
              colorShade="dark"
              query={insight.anxiety}
              style={styles.description}
              textClass="p"
            >
              {i18n.t('mental-health-playback.general.insight-description-personal', {
                anxiety: insight.anxiety,
                level_of_association: insight.level_of_association,
              })}
            </TextHighlight>
            <Text inverted colorPalette="uiDark" colorShade="main" style={styles.label} textClass="pSmall">
              {i18n.t('mental-health-playback.general.chart-label')}
            </Text>
            <BarChart color="#0165B5" items={insight.answer_distribution} userAnswer={insight.user_answer} />
          </View>

          <View style={styles.correlatedWrapper}>
            <Text inverted colorPalette="accentBlue" colorShade="main" textAlign="center" textClass="p">
              {i18n.t('mental-health-playback.general.correlated-description')}
            </Text>
            <View style={styles.activitiesWrapper}>
              {(insight.correlated_activities || []).map((activityName: string) => (
                // eslint-disable-next-line react/no-array-index-key
                <View key={`insight-${index}-correlated-${activityName}`} style={styles.activityWrapper}>
                  <InsightIllustration height={45} type={activityName} width={50} />
                  <Text
                    inverted
                    colorPalette="accentBlue"
                    colorShade="main"
                    style={styling.marginTopSmall}
                    textAlign="center"
                    textClass="pSmall"
                  >
                    {i18n.t(`mental-health-playback.insights.${activityName}.abbreviation`, { defaultValue: '' })}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  activitiesWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: grid.m,
  },
  activityWrapper: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    paddingHorizontal: grid.m,
  },
  card: {
    alignSelf: 'center',
    marginHorizontal: 14,
    marginTop: 14,
  },
  contentWrapper: {
    marginBottom: grid.xxl,
    marginTop: grid.m,
    paddingLeft: grid.xl,
    paddingRight: grid.xxxl,
  },
  correlatedWrapper: {
    backgroundColor: '#F5F9FC',
    padding: grid.l,
  },
  description: {
    marginTop: grid.m,
  },
  illustrationWrapper: {
    flex: 1,
    maxHeight: 250,
    position: 'relative',
  },
  label: {
    marginBottom: grid.m,
    marginTop: grid.xxl,
  },
});

import { BrandedButton } from '@covid/components';
import { DeltaTag } from '@covid/components/cards/estimated-case/DeltaTag';
import { ETrendLineViewMode, TrendLineChart } from '@covid/components/charts/TrendLineChart';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import { Screen } from '@covid/components/Screen';
import { Header3Text, RegularText } from '@covid/components/Text';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { fetchLocalTrendLine } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { colors, fontStyles } from '@theme';
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';

export const TrendlineScreen: React.FC = () => {
  const dispatch = useDispatch();
  const viewRef = React.useRef<View>(null);
  const trendline = useSelector<TRootState, ITrendLineData | undefined>((state) => ({
    ...state.content.exploreTrendline,
  }));

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync(`file://${uri}`);
    } catch (_) {}
  };

  React.useEffect(() => {
    dispatch(fetchLocalTrendLine());
  }, []);

  return (
    <Screen noScrollView backgroundColor="white" testID="trendline-screen">
      <View collapsable={false} ref={viewRef} style={styles.flex}>
        <RegularText style={{ textAlign: 'center' }}>{i18n.t('explore-trend-line.title')}</RegularText>

        <RegularText style={styles.district}>{trendline?.name}</RegularText>

        <Header3Text style={styles.metric}>{trendline?.today}</Header3Text>

        {trendline?.delta ? <DeltaTag change={trendline.delta} style={styles.deltaTag} /> : null}

        <View style={styles.chartWrapper}>
          <TrendLineChart viewMode={ETrendLineViewMode.explore} />
        </View>

        <BrandedButton onPress={share} style={styles.shareButton}>
          <Text style={[fontStyles.bodyLight, styles.shareButtonText]}>{i18n.t('explore-trend-line.cta')}</Text>
        </BrandedButton>

        <PoweredByZoeSmall />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  deltaTag: {
    alignSelf: 'center',
    marginTop: 16,
    marginVertical: 32,
  },
  district: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  metric: {
    color: colors.textDark,
    fontSize: 32,
    lineHeight: 48,
    paddingTop: 8,
    textAlign: 'center',
  },
  shareButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 32,
    paddingHorizontal: 48,
  },
  shareButtonText: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '300',
  },
});

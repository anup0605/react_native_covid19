import { Tag, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { StudyCard } from '@covid/features/studies-hub/components/StudyCard';
import { TStudy } from '@covid/features/studies-hub/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const studies: TStudy[] = require('../assets/studies.json');

export function StudiesListScreen() {
  const startupInfo = useSelector(selectStartupInfo);
  const title = startupInfo?.wider_health_studies_consent
    ? i18n.t('studies-hub.consented.title')
    : i18n.t('studies-hub.not-consented.title');
  const description = startupInfo?.wider_health_studies_consent
    ? i18n.t('studies-hub.consented.description')
    : i18n.t('studies-hub.not-consented.description');
  return (
    <Screen testID="studies-hub-screen">
      <Tag color={colors.accent} style={styles.alignStart} text={i18n.t('new')} />
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginVertical}
        testID="studies-hub-screen-title"
        textClass="h2"
      >
        {title}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginBottom} textClass="pLight">
        {description}
      </Text>
      {studies.map((study, index) => (
        <StudyCard
          active
          key={`study-card-${study.id}`}
          onPress={() => NavigatorService.navigate('StudyDetails', { studyId: study.id })}
          study={study}
          style={index !== 0 && styles.marginTop}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginTop: {
    marginTop: sizes.m,
  },
  marginVertical: {
    marginBottom: sizes.m,
    marginTop: sizes.m,
  },
});

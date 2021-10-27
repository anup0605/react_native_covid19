import { Tag, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { selectStartupInfo } from '@covid/core/state/selectors';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

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
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
        {description}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  alignStart: {
    alignSelf: 'flex-start',
  },
  marginVertical: {
    marginBottom: sizes.m,
    marginTop: sizes.m,
  },
});

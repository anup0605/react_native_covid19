import { Tag, Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export function StudiesListScreen() {
  return (
    <Screen testID="studies-hub-screen">
      <Tag color={colors.accent} style={styles.alignStart} text={i18n.t('new')} />
      <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginVertical} textClass="h2">
        {i18n.t('studies-hub.consented.title')}
      </Text>
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pLight">
        {i18n.t('studies-hub.consented.description')}
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

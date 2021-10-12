import { Text } from '@covid/components';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { DiseasePreferencesList } from '@covid/features/wider-health-studies/components/DiseasePreferencesList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function onPressNext() {
  NavigatorService.navigate('ReconsentDiseaseSummary');
}

export default function ReconsentDiseasePreferencesScreen() {
  return (
    <ReconsentScreen noPadding activeDot={1} testID="reconsent-disease-preferences-screen">
      <View style={styles.paddingHorizontal}>
        <Text rhythm={24} textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.disease-preferences.title')}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textAlign="center" textClass="pLight">
          {i18n.t('reconsent.disease-preferences.subtitle')}
        </Text>
      </View>
      <DiseasePreferencesList buttonTitle={i18n.t('navigation.next')} onSubmit={onPressNext} />
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: sizes.l,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
});

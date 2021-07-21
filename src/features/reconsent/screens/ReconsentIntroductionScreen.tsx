import { Text } from '@covid/components';
import IllustrationTim from '@covid/features/reconsent/components/IllustrationTim';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import TalkRectangle from '@covid/features/reconsent/components/TalkRectangle';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export default function ReconsentIntroductionScreen() {
  return (
    <ReconsentScreen
      hideBackButton
      buttonOnPress={() => NavigatorService.navigate('ReconsentDiseasePreferences')}
      buttonTitle={i18n.t('reconsent.introduction.button')}
      testID="reconsent-introduction-screen"
    >
      <Text
        inverted
        colorPalette="actionPrimary"
        colorShade="main"
        style={styles.marginTop}
        textAlign="center"
        textClass="h5Medium"
      >
        {i18n.t('company-name')}{' '}
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h5Light">
          {i18n.t('app-name')}
        </Text>
      </Text>
      <IllustrationTim style={styles.illustration} />
      <TalkRectangle>
        <Text inverted colorPalette="accentBlue" colorShade="main" textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.introduction.title')}
        </Text>
      </TalkRectangle>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.marginVertical}
        textAlign="center"
        textClass="h4Light"
      >
        {i18n.t('reconsent.introduction.description')}
      </Text>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignSelf: 'center',
    marginTop: 12,
  },
  marginTop: {
    marginTop: 32,
  },
  marginVertical: {
    marginBottom: 32,
    marginTop: 32,
  },
});

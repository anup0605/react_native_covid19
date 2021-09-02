import { Text } from '@covid/components';
import IllustrationTim from '@covid/features/reconsent/components/IllustrationTim';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import TalkRectangle from '@covid/features/reconsent/components/TalkRectangle';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ReconsentIntroductionScreen() {
  return (
    <ReconsentScreen
      hideBackButton
      buttonOnPress={() => NavigatorService.navigate('ReconsentDiseasePreferences')}
      buttonTitle={i18n.t('reconsent.introduction.button')}
      testID="reconsent-introduction-screen"
    >
      <Text inverted colorPalette="actionPrimary" colorShade="main" textAlign="center" textClass="h5Medium">
        {i18n.t('company-name')}{' '}
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h5Light">
          {i18n.t('app-name')}
        </Text>
      </Text>
      <IllustrationTim style={styles.illustration} />
      <TalkRectangle>
        <Text inverted colorPalette="accentBlue" colorShade="main" textAlign="center" textClass="h3Light">
          {i18n.t('reconsent.introduction.title')}
        </Text>
      </TalkRectangle>
      <View style={styles.textWrapper}>
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h5Light">
          {i18n.t('reconsent.introduction.description')}
        </Text>
        <View style={styles.marginVertical} />
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h5Light">
          {i18n.t('reconsent.introduction.approval')}
        </Text>
      </View>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignSelf: 'center',
    marginTop: sizes.s,
  },
  marginVertical: {
    marginVertical: sizes.s,
  },
  textWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingVertical: sizes.xl,
  },
});

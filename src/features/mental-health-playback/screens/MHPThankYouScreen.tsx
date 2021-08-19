import { Text } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MHPThankYouScreen() {
  function onPress() {
    NavigatorService.goBack();
  }
  return (
    <Screen
      backgroundColor={colors.white}
      footerOnPress={onPress}
      footerTitle={i18n.t('mental-health-playback.thank-you.button')}
      testID="mhp-thank-you-screen"
    >
      <View style={styles.view}>
        <Text
          inverted
          colorPalette="accentBlue"
          colorShade="main"
          style={styling.marginBottomHuge}
          textAlign="center"
          textClass="h2"
        >
          {i18n.t('mental-health-playback.thank-you.title')}
        </Text>
        <Text inverted colorPalette="accentBlue" colorShade="main" textAlign="center" textClass="h5Medium">
          {i18n.t('mental-health-playback.thank-you.description')}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    maxWidth: 250,
  },
});

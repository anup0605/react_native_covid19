import { gbPartners, svPartners, usPartners } from '@assets';
import { BrandedButton } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import {
  isGBCountry,
  isSECountry,
  isUSCountry,
  LocalisationService,
  localisationService,
} from '@covid/core/localisation/LocalisationService';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import CountryIpModal from './CountryIpModal';
import { getLocaleFlagIcon } from './helpers';

const Slash = () => <RegularBoldText style={styles.slash}> / </RegularBoldText>;

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Welcome'>;
  route: RouteProp<TScreenParamList, 'Welcome'>;
};

const Welcome2Screen: React.FC<TProps> = ({ navigation }) => {
  const [ipModalVisible, setIpModalVisible] = React.useState(false);

  const onLoginPress = React.useCallback(() => navigation.navigate('Login'), [navigation.navigate]);

  const onCloseModal = React.useCallback(() => setIpModalVisible(false), [setIpModalVisible]);

  const onCreateAccountPress = React.useCallback(async () => {
    if (await localisationService.shouldAskCountryConfirmation()) {
      setIpModalVisible(true);
    } else {
      appCoordinator.goToPreRegisterScreens();
    }
  }, [localisationService.shouldAskCountryConfirmation, setIpModalVisible, isUSCountry, navigation.navigate]);

  const getFlagIcon = React.useCallback(getLocaleFlagIcon, [getLocaleFlagIcon]);

  const helpUrl = React.useCallback(() => {
    if (isGBCountry()) {
      openWebLink('https://www.nhs.uk/conditions/coronavirus-covid-19/');
    } else if (isSECountry()) {
      openWebLink('https://www.1177.se');
    }
  }, [isGBCountry, isSECountry]);

  const partnersLogos = React.useCallback(() => {
    if (isGBCountry()) {
      return gbPartners;
    }
    if (isSECountry()) {
      return svPartners;
    }
    return usPartners;
  }, [isGBCountry, isSECountry, gbPartners, svPartners, usPartners]);

  return (
    <>
      <Screen backgroundColor={colors.backgroundSecondary} testID="welcome-2-screen">
        <View style={styles.covidContainer}>
          <View style={styles.headerRow}>
            <ClickableText onPress={onLoginPress} style={styles.login} testID="login">
              {i18n.t('log-in')}
            </ClickableText>
            <TouchableOpacity onPress={() => navigation.navigate('CountrySelect')} testID="select-country">
              <Image
                source={getFlagIcon()}
                style={styles.flagIcon}
                testID={`flag-${LocalisationService.userCountry}`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <RegularText style={styles.subtitle}>{i18n.t('welcome.how-you-can-help.title')}</RegularText>
            <RegularText style={styles.subheader}>{i18n.t('welcome.how-you-can-help.text1')}</RegularText>

            {isUSCountry() ? (
              <RegularText style={styles.subheader2}>{i18n.t('welcome.how-you-can-help.text2')}</RegularText>
            ) : null}

            {isSECountry() || isGBCountry() ? (
              <RegularText style={styles.subheader2}>
                {'\n'}
                {i18n.t('welcome.disclaimer')}{' '}
                <ClickableText onPress={helpUrl} style={[styles.subheader2, styles.nhsWebsite]} testID="disclaimer">
                  {i18n.t('welcome.disclaimer-link')}
                </ClickableText>
                .
              </RegularText>
            ) : null}

            <Image source={partnersLogos()} style={styles.partnersLogo} />
          </View>

          {isUSCountry() ? (
            <View style={styles.partnerContainer}>
              <RegularText style={styles.partnerHeader}>{i18n.t('welcome.from-researchers')}</RegularText>

              <View style={styles.divider} />

              <RegularText style={styles.partnerList}>
                {i18n.t('names.harvard-th-chan-school-of-public-health')}
                <Slash />
                {i18n.t('names.mass-general-hospital')}
                <Slash />
                {i18n.t('names.kings-college-london')}
                <Slash />
                {i18n.t('names.stanford-university-school-of-medicine')}
                <Slash />
                {i18n.t('names.zoe')}
              </RegularText>
            </View>
          ) : null}
        </View>

        <View style={{ flex: 1 }} />

        <BrandedButton onPress={onCreateAccountPress} testID="create-account-2">
          {i18n.t('welcome.create-account')}
        </BrandedButton>
      </Screen>

      <CountryIpModal
        closeModal={onCloseModal}
        isModalVisible={ipModalVisible}
        navigation={navigation}
        testID="country-ip-modal"
      />
    </>
  );
};

const styles = StyleSheet.create({
  covidContainer: {
    paddingBottom: 24,
  },
  divider: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginVertical: 4,
  },
  flagIcon: {
    height: 32,
    width: 32,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  login: {
    color: colors.primary,
    marginRight: 16,
  },
  nhsWebsite: {
    textDecorationLine: 'underline',
  },
  partnerContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  partnerHeader: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  partnerList: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  partnersLogo: {
    alignSelf: 'center',
    height: 160,
    marginVertical: 16,
    resizeMode: 'contain',
    width: '100%',
  },
  slash: {
    color: colors.lightBlueBrand,
  },
  subheader: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
  subheader2: {
    color: colors.secondary,
    fontFamily: 'SofiaPro-Light',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    paddingVertical: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.primary,
    fontSize: 24,
    lineHeight: 32,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
  },
});

export default Welcome2Screen;

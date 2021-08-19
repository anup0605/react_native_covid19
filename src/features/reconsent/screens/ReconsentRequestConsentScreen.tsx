import appConfig from '@covid/appConfig';
import { Text } from '@covid/components';
import { BrandedButton } from '@covid/components/buttons';
import { ErrorText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { consentService } from '@covid/core/consent/ConsentService';
import { patientService } from '@covid/core/patient/PatientService';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { TRootState } from '@covid/core/state/root';
import { Card } from '@covid/features/reconsent/components/Card';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  route: RouteProp<TScreenParamList, 'ReconsentRequestConsent'>;
}

const hitSlop = {
  bottom: 20,
  top: 20,
};

export default function ReconsentRequestConsentScreen(props: IProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const diseasePreferences = useSelector(selectDiseasePreferences);

  const onPrivacyPolicyPress = () => {
    Analytics.track(events.RECONSENT_PRIVACY_POLICY_CLICKED);
    NavigatorService.navigate('PrivacyPolicyUK');
  };

  const onInformationSheetPress = () => {
    Analytics.track(events.RECONSENT_INFORMATION_SHEET_CLICKED);
    openWebLink('https://covid.joinzoe.com/wider-health-studies-factsheet');
  };

  const renderCallouts = () => {
    return [1, 2, 3].map((i) => (
      <Card
        description={i18n.t(`reconsent.request-consent.use-${i}-description`)}
        index={i - 1}
        key={i}
        title={i18n.t(`reconsent.request-consent.use-${i}-title`)}
      />
    ));
  };

  async function onPressYes() {
    Analytics.track(events.RECONSENT_YES_CLICKED);
    const diseasePreferencesPayload = { ...diseasePreferences, research_consent_asked: true };
    try {
      setLoading(true);
      await consentService.postConsent(
        'Health Study Consent',
        appConfig.healthStudyConsentVersionUK,
        appConfig.privacyPolicyVersionUK,
      );
      await patientService.updatePatientInfo(patientId, diseasePreferencesPayload);
      NavigatorService.navigate('ReconsentNewsletterSignup');
    } catch {
      setError(i18n.t('something-went-wrong'));
    }
    setLoading(false);
  }

  function onPressNo() {
    Analytics.track(events.RECONSENT_FIRST_NO_CLICKED);
    NavigatorService.navigate('ReconsentFeedback');
  }

  return (
    <ReconsentScreen activeDot={3} testID="reconsent-request-consent-screen">
      <Text rhythm={16} style={styles.center} textClass="h2Light">
        {i18n.t('reconsent.request-consent.title')}
      </Text>
      <Text rhythm={24} style={[styles.center, styles.subtitle]} textClass="pLight">
        {i18n.t('reconsent.request-consent.subtitle')}
      </Text>
      {renderCallouts()}
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPrivacyPolicyPress}
        style={styles.marginTop}
        testID="button-privacy-notice"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.privacy-notice')}{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onInformationSheetPress}
        style={styles.marginTop}
        testID="button-information-sheet"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.information-sheet')}{' '}
        </Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      {error ? <ErrorText style={styles.errorText}>{error}</ErrorText> : null}
      <BrandedButton
        enabled={!loading}
        loading={loading}
        onPress={onPressYes}
        style={styles.buttonYes}
        testID="button-yes"
      >
        {i18n.t('reconsent.request-consent.consent-yes')}
      </BrandedButton>
      <TouchableOpacity disabled={loading} onPress={onPressNo} style={styles.buttonNo} testID="button-no">
        <Text
          inverted
          colorPalette="uiDark"
          colorShade="dark"
          textAlign="center"
          textClass="pLight"
          textDecorationLine="underline"
        >
          {i18n.t('reconsent.request-consent.consent-no')}
        </Text>
      </TouchableOpacity>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  buttonNo: {
    marginBottom: grid.l,
    marginTop: grid.xxxl,
    paddingHorizontal: grid.xs,
  },
  buttonYes: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  center: {
    textAlign: 'center',
  },
  errorText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  externalLink: {
    color: colors.darkblue,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  hr: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    marginBottom: grid.xxl,
    marginTop: 32,
    width: '100%',
  },
  marginTop: {
    marginTop: 32,
  },
  page: {
    backgroundColor: colors.backgroundPrimary,
  },
  subtitle: {
    color: colors.secondary,
  },
});

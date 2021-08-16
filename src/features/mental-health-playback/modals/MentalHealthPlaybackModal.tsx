import { QuoteMarks } from '@assets';
import { BrandedButton, DoctorProfile, Modal, Tag, Text } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import i18n from '@covid/locale/i18n';
import { generalApiClient } from '@covid/services';
import { colors, styling } from '@covid/themes';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export default function MentalHealthPlaybackModal(props: IProps) {
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>((state) => state.content.startupInfo);

  function onRequestClose(positive?: boolean) {
    if (!positive) {
      Analytics.track(Analytics.events.MENTAL_HEALTH_PLAYBACK_CLOSE_MODAL);
    }
    props.onRequestClose();
  }

  function handlePositive() {
    generalApiClient.postUserEvent('view-mental-health-insights');
    onRequestClose(true);
    appCoordinator.goToMentalHealthStudyPlayback();
  }

  function handleNegative() {
    generalApiClient.postUserEvent('skip-mental-health-insights');
    onRequestClose();
  }

  return (
    <Modal modalName="MentalHealthPlayback" onRequestClose={onRequestClose} visible={props.visible}>
      <Tag
        color={colors.coral.main.bgColor}
        style={styling.selfCenter}
        text={i18n.t('mental-health-playback.modal.tag').toUpperCase()}
      />
      <Text
        inverted
        colorPalette="accentBlue"
        colorShade="main"
        style={styles.title}
        textAlign="center"
        textClass="h3Regular"
      >
        {i18n.t('mental-health-playback.modal.title-new-personal')}
      </Text>
      <DoctorProfile
        image={getMentalHealthStudyDoctorImage()}
        location={i18n.t('mental-health.doctor-location')}
        name={i18n.t('mental-health.doctor-name')}
        title={i18n.t('mental-health.doctor-title')}
      />
      <QuoteMarks />
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.description} textClass="pLight">
        {i18n.t('mental-health-playback.modal.description-new')}
      </Text>
      <BrandedButton onPress={handlePositive} style={styles.buttonPositive}>
        {i18n.t('mental-health-playback.modal.button-positive-new')}
      </BrandedButton>
      <BrandedButton onPress={handleNegative} style={styles.buttonNegative}>
        <Text textClass="pSmallLight">{i18n.t('mental-health-playback.modal.button-negative')}</Text>
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonNegative: {
    backgroundColor: 'white',
  },
  buttonPositive: {
    backgroundColor: '#0165B5',
  },
  description: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    marginBottom: 16,
    marginTop: 16,
  },
});

import { QuoteMarks } from '@assets';
import { BrandedButton, DoctorProfile, Modal, Tag, Text } from '@covid/components';
import { events, track } from '@covid/core/Analytics';
import { RootState } from '@covid/core/state/root';
import { selectFirstPatientId } from '@covid/core/state/user';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import util from '@covid/features/mental-health-playback/util';
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
  const [tracked, setTracked] = React.useState(false);
  const patientId = useSelector(selectFirstPatientId);
  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const testGroupId = React.useMemo(() => util.determineTestGroupId(patientId), [patientId]);

  React.useEffect(() => {
    if (!tracked) {
      track(events.MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL);
      setTracked(true);
    }
  });

  function handlePositive() {
    generalApiClient.postUserEvent('view-mental-health-insights');
    props.onRequestClose();
    appCoordinator.goToMentalHealthStudyPlayback(startupInfo);
  }

  function handleNegative() {
    generalApiClient.postUserEvent('skip-mental-health-insights');
    props.onRequestClose();
  }

  return (
    <Modal onRequestClose={props.onRequestClose} visible={props.visible}>
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
        {i18n.t('mental-health-playback.modal.title')}
      </Text>
      <DoctorProfile
        image={getMentalHealthStudyDoctorImage()}
        location={i18n.t('mental-health.doctor-location')}
        name={i18n.t('mental-health.doctor-name')}
        title={i18n.t('mental-health.doctor-title')}
      />
      <QuoteMarks />
      <Text inverted colorPalette="uiDark" colorShade="dark" style={styles.description} textClass="pLight">
        {startupInfo?.mh_insight_cohort === 'MHIP-v1-cohort_b'
          ? i18n.t('mental-health-playback.modal.description-general')
          : i18n.t('mental-health-playback.modal.description-personal')}
      </Text>
      <BrandedButton onPress={handlePositive} style={styles.buttonPositive}>
        {i18n.t('mental-health-playback.modal.button-positive')}
      </BrandedButton>
      {testGroupId !== 'GROUP_E' && testGroupId !== 'GROUP_F' ? (
        <BrandedButton onPress={handleNegative} style={styles.buttonNegative}>
          <Text textClass="pSmallLight">{i18n.t('mental-health-playback.modal.button-negative')}</Text>
        </BrandedButton>
      ) : null}
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

import { BrandedButton, HeaderText, Modal, RegularText } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { events, track } from '@covid/core/Analytics';
import { fetchStartUpInfo } from '@covid/core/content/state/contentSlice';
import { patientService } from '@covid/core/patient/PatientService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

const ONBOARDING_SCREENS = [
  require('@covid/features/covid-tests/modals/gifs/screen_1.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_2.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_3.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_4.gif'),
];

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
  patientId: string;
}

export default function CovidTestListOnboardingModal(props: IProps) {
  const dispatch = useDispatch();
  const [tracked, setTracked] = React.useState(false);
  const [onboardingModalScreenIndex, setOboardingModalScreenIndex] = React.useState<number>(0);
  const [selectedGif, setSelectedGif] = React.useState<any>(ONBOARDING_SCREENS[0]);

  React.useEffect(() => {
    if (!tracked) {
      track(events.COVID_TEST_ONBOARDING_MODAL);
      setTracked(true);
    }
  });

  function closeAndUpateStartupInfo() {
    const infos: Partial<TPatientInfosRequest> = {
      has_seen_covid_test_onboarding: true,
    };
    patientService.updatePatientInfo(props.patientId, infos).then(() => {
      props.onRequestClose();
      dispatch(fetchStartUpInfo());
    });
  }

  function setIndexAndGif(selectedIndex: number) {
    setOboardingModalScreenIndex(selectedIndex);
    setSelectedGif(ONBOARDING_SCREENS[selectedIndex]);
  }

  function nextModalOrComplete() {
    const selectedIndex = onboardingModalScreenIndex + 1;
    if (selectedIndex >= ONBOARDING_SCREENS.length) {
      closeAndUpateStartupInfo();
    } else {
      setIndexAndGif(selectedIndex);
    }
  }

  function previousModal() {
    if (onboardingModalScreenIndex === 0) {
      return;
    }
    const selectedIndex = onboardingModalScreenIndex - 1;
    setIndexAndGif(selectedIndex);
  }

  const headerChildren = React.useMemo(
    () => (
      <TouchableOpacity
        hitSlop={HIT_SLOP}
        onPress={closeAndUpateStartupInfo}
        style={styles.closeTouchable}
        testID="modal-close-button"
      >
        <RegularText style={styles.closeText}>{i18n.t(`modal-close`)}</RegularText>
      </TouchableOpacity>
    ),
    [closeAndUpateStartupInfo],
  );

  const footerChildren = React.useMemo(
    () => (
      <BrandedButton onPress={nextModalOrComplete} style={styles.button} testID="covid-test-modal-button">
        {onboardingModalScreenIndex === ONBOARDING_SCREENS.length - 1
          ? i18n.t('covid-test-modal.button-end')
          : i18n.t('covid-test-modal.button')}
      </BrandedButton>
    ),
    [onboardingModalScreenIndex],
  );

  return (
    <Modal
      footerChildren={footerChildren}
      headerChildren={headerChildren}
      onRequestClose={closeAndUpateStartupInfo}
      swipeLeft={nextModalOrComplete}
      swipeRight={previousModal}
      testID={`covid-test-modal-${onboardingModalScreenIndex}`}
      visible={props.visible}
    >
      <View style={styles.wrapper}>
        <ProgressStatus color={colors.lightBlueBrand} currentStep={onboardingModalScreenIndex + 1} maxSteps={4} />

        <View style={styles.newDesign}>
          <RegularText style={styles.newDesignText}>{i18n.t('covid-test-modal.new-design')}</RegularText>
        </View>

        <HeaderText style={styles.text}>
          {i18n.t(`covid-test-modal.screen-${onboardingModalScreenIndex}.title`)}
        </HeaderText>
        <Image source={selectedGif} style={styles.gif} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  closeText: {
    color: colors.lightBrand,
    fontWeight: '600',
  },
  closeTouchable: {
    alignSelf: 'flex-end',
  },
  gif: {
    flex: 1,
    height: 500,
    resizeMode: 'contain',
  },
  newDesign: {
    alignSelf: 'center',
    backgroundColor: colors.lightBlueBrand,
    borderRadius: 6,
    marginBottom: 24,
    marginTop: 32,
    paddingHorizontal: 12,
    paddingVertical: 3,
    textAlign: 'center',
  },
  newDesignText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    marginBottom: 16,
    marginTop: 16,
  },
  wrapper: {
    alignItems: 'center',
    padding: 8,
  },
});

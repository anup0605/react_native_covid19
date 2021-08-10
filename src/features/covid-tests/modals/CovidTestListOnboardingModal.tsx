import { BrandedButton, HeaderText, Modal, RegularText } from '@covid/components';
import ProgressStatus from '@covid/components/ProgressStatus';
import { ProgressBlock } from '@covid/components/Screen';
import { events, track } from '@covid/core/Analytics';
import { fetchStartUpInfo } from '@covid/core/content/state/contentSlice';
import { patientService } from '@covid/core/patient/PatientService';
import store from '@covid/core/state/store';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const ONBOARDING_SCREENS = [
  require('@covid/features/covid-tests/modals/gifs/screen_1.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_2.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_3.gif'),
  require('@covid/features/covid-tests/modals/gifs/screen_4.gif'),
];

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
  patientId: string;
}

export default function CovidTestListOnboardingModal(props: IProps) {
  const [tracked, setTracked] = React.useState(false);
  const [onboardingModalScreenIndex, setOboardingModalScreenIndex] = React.useState<number>(0);
  const [selectedGif, setSelectedGif] = React.useState<any>(ONBOARDING_SCREENS[0]);

  React.useEffect(() => {
    if (!tracked) {
      track(events.COVID_TEST_ONBOARDING_MODAL);
      setTracked(true);
    }
  });

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

  async function closeAndUpateStartupInfo() {
    const infos: Partial<TPatientInfosRequest> = {
      has_seen_covid_test_onboarding: true,
    };
    patientService.updatePatientInfo(props.patientId, infos).then(async (_) => {
      props.onRequestClose();
      // Renew app's startup info
      await store.dispatch(fetchStartUpInfo());
    });
  }

  const footerChildren = (
    <BrandedButton onPress={nextModalOrComplete} style={styles.button} testID={'covid-test-modal-button'}>
      {onboardingModalScreenIndex === ONBOARDING_SCREENS.length - 1
        ? i18n.t('covid-test-modal.button-end')
        : i18n.t('covid-test-modal.button')}
    </BrandedButton>
  );

  return (
    <Modal
      visible
      onRequestClose={closeAndUpateStartupInfo}
      footerChildren={footerChildren}
      swipeRight={previousModal}
      swipeLeft={nextModalOrComplete}
      testID={`covid-test-modal-screen-${onboardingModalScreenIndex}`}
      showCloseButton
    >
      <View style={styles.wrapper}>
        <ProgressBlock>
          <ProgressStatus maxSteps={4} currentStep={onboardingModalScreenIndex + 1} color={colors.lightBlueBrand} />
        </ProgressBlock>

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
  wrapper: {
    padding: 8,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 16,
    marginTop: 64,
  },
  gif: {
    resizeMode: 'contain',
    height: 500,
    flex: 1,
  },
  text: {
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    marginBottom: 16,
    marginTop: 16,
  },
  newDesign: {
    backgroundColor: colors.lightBlueBrand,
    textAlign: 'center',
    paddingVertical: 3,
    paddingHorizontal: 12,
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 24,
    borderRadius: 6,
  },
  newDesignText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

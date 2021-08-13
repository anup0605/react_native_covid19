import { BrandedButton, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TRootState } from '@covid/core/state/root';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { CovidTestTabbedListsScreen } from '@covid/features/covid-tests';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getTestType } from './helpers';
import CovidTestListOnboardingModal from './modals/CovidTestListOnboardingModal';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestList'>;
  route: RouteProp<TScreenParamList, 'CovidTestList'>;
}

const SINGLE_TEST_ROW_HEIGHT = 48;
const HEIGHT_OF_STATIC_CONTENT = 500;

export default function CovidTestListScreen(props: IProps) {
  const [covidTests, setCovidTests] = React.useState<TCovidTest[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [showOnboardingModal, setShowOnboardingModal] = React.useState<boolean>(false);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>((state) => state.content.startupInfo);

  const windowDimensions = useWindowDimensions();
  const minTabViewHeight = SINGLE_TEST_ROW_HEIGHT * 5;
  const tabViewHeight = windowDimensions.height - HEIGHT_OF_STATIC_CONTENT;

  useFocusEffect(
    React.useCallback(() => {
      if (startupInfo?.show_covid_test_onboarding && !assessmentCoordinator.isReportedByOther()) {
        setShowOnboardingModal(true);
      }

      let isActive = true;

      const fetchTestList = async () => {
        setIsLoading(true);
        try {
          const tests = (await covidTestService.listTests()).data;
          const patientTests = tests.filter(
            (t) => t.patient === assessmentCoordinator.assessmentData?.patientData?.patientId,
          );
          if (isActive) {
            setCovidTests(patientTests);
            setIsLoading(false);
          }
        } catch (_) {
          setError(i18n.t('something-went-wrong'));
          setIsLoading(false);
        }
      };

      fetchTestList();

      return () => {
        isActive = false;
      };
    }, [startupInfo]),
  );

  function gotoAddTest() {
    assessmentCoordinator.goToAddEditTest();
  }

  function handleNextButton() {
    assessmentCoordinator.gotoNextScreen(props.route.name);
  }

  const currentPatient = assessmentCoordinator.assessmentData?.patientData?.patientState;

  const showTab = props.route.params?.mechanism
    ? getTestType(props.route.params.mechanism, props.route.params.is_rapid_test) || 'Lateral'
    : 'Lateral';

  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      profile={currentPatient?.profile}
      testID="covid-test-list-screen"
    >
      <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('covid-test-list.title')} />

      {!showOnboardingModal ? null : (
        <CovidTestListOnboardingModal
          onRequestClose={() => {
            setShowOnboardingModal(false);
          }}
          patientId={assessmentCoordinator.assessmentData?.patientData?.patientId}
          visible={showOnboardingModal}
        />
      )}

      {covidTests.length ? null : (
        <RegularText style={styles.marginTop} testID="covid-test-list-introduction">
          {i18n.t('covid-test-list.text')}
        </RegularText>
      )}

      <BrandedButton onPress={gotoAddTest} style={styles.newButton} testID="button-add-test">
        <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
      </BrandedButton>

      {covidTests.length ? (
        <Text style={styles.tabTitle} textAlign="center" textClass="h4Medium">
          {i18n.t('covid-test-list.tabs-title')}
        </Text>
      ) : null}

      {isLoading ? (
        <Loading error={null} status="" />
      ) : covidTests.length ? (
        <CovidTestTabbedListsScreen
          covidTests={covidTests}
          minTabViewHeight={minTabViewHeight}
          showTab={showTab}
          tabViewHeight={tabViewHeight}
        />
      ) : null}

      {error ? <ErrorText style={{ textAlign: 'center' }}>{error}</ErrorText> : null}

      <View style={{ flex: 1 }} />

      <BrandedButton onPress={handleNextButton} testID="button-covid-test-list-screen">
        <Text style={{ color: colors.white }}>
          {covidTests.length === 0
            ? i18n.t('covid-test-list.never-had-test')
            : i18n.t('covid-test-list.above-list-correct')}
        </Text>
      </BrandedButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 24,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginBottom: 16,
    marginTop: 24,
  },
  newText: {
    color: colors.primary,
  },
  tabTitle: {
    color: colors.secondary,
  },
});

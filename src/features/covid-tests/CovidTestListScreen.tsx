import { BrandedButton } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import Screen from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import key from 'weak-key';

import { CovidTestRow } from './components/CovidTestRow';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestList'>;
  route: RouteProp<TScreenParamList, 'CovidTestList'>;
};

type TState = {
  covidTests: TCovidTest[];
  isLoading: boolean;
};

export default class CovidTestListScreen extends React.Component<TProps, TState> {
  state: TState = {
    covidTests: [],
    isLoading: false,
  };

  private unsubscribe: any = null;

  async componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.setState({ isLoading: true });
      try {
        const tests = (await covidTestService.listTests()).data;
        const patientTests = tests.filter(
          (t) => t.patient === assessmentCoordinator.assessmentData?.patientData?.patientId,
        );
        this.setState({ covidTests: patientTests, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  gotoAddTest = () => {
    assessmentCoordinator.goToAddEditTest();
  };

  handleNextButton = async () => {
    assessmentCoordinator.gotoNextScreen(this.props.route.name);
  };

  render() {
    const currentPatient = assessmentCoordinator.assessmentData?.patientData?.patientState;
    const { isLoading } = this.state;

    return (
      <View style={styles.rootContainer}>
        <Screen profile={currentPatient?.profile} testID="covid-test-list-screen">
          <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('covid-test-list.title')} />

          <View style={styles.content}>
            <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
          </View>

          <BrandedButton onPress={this.gotoAddTest} style={styles.newButton} testID="button-add-test">
            <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
          </BrandedButton>

          {isLoading ? (
            <Loading error={null} status="" />
          ) : (
            <View style={styles.content}>
              {this.state.covidTests.map((item: TCovidTest) => {
                return <CovidTestRow item={item} key={key(item)} />;
              })}
            </View>
          )}

          <View style={{ flex: 1 }} />

          <BrandedButton
            onPress={this.handleNextButton}
            style={styles.continueButton}
            testID="button-covid-test-list-screen"
          >
            <Text style={{ color: colors.white }}>
              {this.state.covidTests.length === 0
                ? i18n.t('covid-test-list.never-had-test')
                : i18n.t('covid-test-list.above-list-correct')}
            </Text>
          </BrandedButton>
        </Screen>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin: 16,
  },
  continueButton: {
    marginHorizontal: 16,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  newText: {
    color: colors.primary,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});

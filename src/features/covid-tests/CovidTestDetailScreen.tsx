import { BrandedButton, DeleteButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Header } from '@covid/components/Screen';
import { ScreenNew } from '@covid/components/ScreenNew';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { ECovidTestType, TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import {
  CovidTestDateQuestion,
  CovidTestInvitedQuestion,
  CovidTestIsRapidQuestion,
  CovidTestLocationQuestion,
  CovidTestMechanismQuestion,
  CovidTestResultQuestion,
  ICovidTestDateData,
  ICovidTestInvitedData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/fields/';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';

import { isZoeInviteOfferTest } from './helpers';

interface ICovidTestData
  extends ICovidTestDateData,
    ICovidTestMechanismData,
    ICovidTestResultData,
    ICovidTestLocationData,
    ICovidTestInvitedData,
    ICovidTestIsRapidData {}

type TCovidProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestDetail'>;
  route: RouteProp<TScreenParamList, 'CovidTestDetail'>;
};

export default function CovidTestDetailScreen(props: TCovidProps) {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const testId = props.route.params?.test?.id;

  function submitCovidTest(infos: Partial<TCovidTest>) {
    if (testId) {
      if (
        props.route.params?.test?.result !== 'positive' &&
        infos.result === 'positive' &&
        props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
      ) {
        setSubmitting(false);
        infos.id = testId;
        assessmentCoordinator.goToTestConfirm(infos as TCovidTest);
      } else {
        covidTestService
          .updateTest(testId, infos)
          .then(() => {
            NavigatorService.navigate({
              name: 'CovidTestList',
              params: { is_rapid_test: infos.is_rapid_test, mechanism: infos.mechanism },
            });
          })
          .catch(() => {
            setErrorMessage(i18n.t('something-went-wrong'));
            setSubmitting(false);
          });
      }
    } else if (
      infos.result === 'positive' &&
      props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
    ) {
      setSubmitting(false);
      assessmentCoordinator.goToTestConfirm(infos as TCovidTest);
    } else {
      covidTestService
        .addTest(infos)
        .then(() => {
          NavigatorService.navigate({
            name: 'CovidTestList',
            params: { is_rapid_test: infos.is_rapid_test, mechanism: infos.mechanism },
          });
        })
        .catch(() => {
          setErrorMessage(i18n.t('something-went-wrong'));
          setSubmitting(false);
        });
    }
  }

  function handleAction(formData: ICovidTestData) {
    if (!submitting) {
      setSubmitting(true);
      if (!formData.useApproximateDate && !formData.dateTakenSpecific) {
        setErrorMessage(i18n.t('covid-test.required-date'));
        setSubmitting(false);
        return;
      }

      if (
        formData.useApproximateDate &&
        (formData.dateTakenBetweenStart === undefined || formData.dateTakenBetweenEnd === undefined)
      ) {
        setErrorMessage(i18n.t('covid-test.required-dates'));
        setSubmitting(false);
        return;
      }

      const infos = {
        patient: assessmentCoordinator.assessmentData?.patientData?.patientId,
        type: ECovidTestType.Generic,
        ...CovidTestDateQuestion.createDTO(formData),
        ...CovidTestMechanismQuestion.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
        ...CovidTestInvitedQuestion.createDTO(formData),
        ...CovidTestLocationQuestion.createDTO(formData),
        ...CovidTestIsRapidQuestion.createDTO(formData),
      } as Partial<TCovidTest>;

      submitCovidTest(infos);
    }
  }

  async function promptDeleteTest() {
    Alert.alert(
      i18n.t('covid-test.delete-test-alert-title'),
      i18n.t('covid-test.delete-test-alert-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: async () => {
            await deleteTest();
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }

  async function deleteTest() {
    await covidTestService.deleteTest(testId!);
    props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  const test = props.route.params?.test;
  const isV1Test = test?.version[0] === '1';

  const registerSchema = Yup.object()
    .shape({})
    .concat(CovidTestDateQuestion.schema())
    .concat(CovidTestMechanismQuestion.schema())
    .concat(CovidTestResultQuestion.schema())
    .concat(CovidTestInvitedQuestion.schema())
    .concat(CovidTestLocationQuestion.schema())
    .concat(CovidTestIsRapidQuestion.schema());

  return (
    <ScreenNew
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="covid-test-detail-screen"
    >
      <Header>
        <HeaderText>
          {i18n.t(testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
        </HeaderText>
      </Header>

      <Formik
        validateOnMount
        initialValues={{
          ...CovidTestDateQuestion.initialFormValues(test),
          ...CovidTestMechanismQuestion.initialFormValues(test),
          ...CovidTestResultQuestion.initialFormValues(test),
          ...CovidTestInvitedQuestion.initialFormValues(test),
          ...CovidTestLocationQuestion.initialFormValues(test),
          ...CovidTestIsRapidQuestion.initialFormValues(test),
        }}
        onSubmit={(values: ICovidTestData) => {
          return handleAction(values);
        }}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form hasRequiredFields>
              <CovidTestMechanismQuestion
                formikProps={props as unknown as FormikProps<ICovidTestMechanismData>}
                test={test}
              />
              <CovidTestDateQuestion formikProps={props as unknown as FormikProps<ICovidTestDateData>} test={test} />
              {test !== undefined && test?.location ? (
                <CovidTestLocationQuestion
                  formikProps={props as unknown as FormikProps<ICovidTestLocationData>}
                  test={test}
                />
              ) : null}
              <CovidTestResultQuestion
                formikProps={props as unknown as FormikProps<ICovidTestResultData>}
                test={test}
              />
              {test !== undefined && test?.is_rapid_test !== null && isV1Test ? (
                <CovidTestIsRapidQuestion
                  formikProps={props as unknown as FormikProps<ICovidTestIsRapidData>}
                  test={test}
                />
              ) : null}
              {(test !== undefined && test?.invited_to_test !== null) ||
              isZoeInviteOfferTest(props.values.mechanism as ECovidTestMechanismOptions) ? (
                <CovidTestInvitedQuestion
                  formikProps={props as unknown as FormikProps<ICovidTestInvitedData>}
                  test={test}
                />
              ) : null}

              <ErrorText>{errorMessage}</ErrorText>

              {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} />
              ) : null}

              {testId ? <DeleteButton onPress={promptDeleteTest} /> : null}

              <BrandedButton
                enabled={!submitting && props.isValid}
                onPress={props.handleSubmit}
                style={styling.marginTop}
                testID="button-submit"
              >
                {i18n.t(testId ? 'covid-test.update-test' : 'covid-test.add-test')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </ScreenNew>
  );
}

import { BrandedButton } from '@covid/components';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import Screen from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { ScreenParamList } from '@covid/features';
import { HeadSymptomsQuestions, THeadSymptomsData } from '@covid/features/assessment/fields/HeadSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'HeadSymptoms'>;
};

export const HeadSymptomsScreen: React.FC<TProps> = ({ route }) => {
  function onSubmit(values: THeadSymptomsData, formikHelpers: FormikHelpers<THeadSymptomsData>) {
    assessmentService.saveAssessment(HeadSymptomsQuestions.createAssessment(values));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  const registerSchema = Yup.object().shape({}).concat(HeadSymptomsQuestions.schema());
  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="head-symptoms-screen"
    >
      <Formik
        initialValues={{
          ...HeadSymptomsQuestions.initialFormValues(),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form style={{ flexGrow: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <ProgressHeader currentStep={2} maxSteps={6} title={i18n.t('describe-symptoms.head-symptoms')} />
                <HeadSymptomsQuestions formikProps={props} />
              </View>
              <View style={{ flex: 1 }} />
              <BrandedButton
                enabled={!props.isSubmitting}
                loading={props.isSubmitting}
                onPress={props.handleSubmit}
                testID="button-submit"
              >
                {i18n.t('describe-symptoms.next')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

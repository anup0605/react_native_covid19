import { BrandedButton } from '@covid/components';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import Screen from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { localisationService } from '@covid/core/localisation/LocalisationService';
import { ScreenParamList } from '@covid/features';
import {
  GeneralSymptomsQuestions,
  TGeneralSymptomsData,
} from '@covid/features/assessment/fields/GeneralSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/services';
import { RouteProp } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import { Form } from 'native-base';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<ScreenParamList, 'GeneralSymptoms'>;
};

export const GeneralSymptomsScreen: React.FC<TProps> = ({ route }) => {
  const config = localisationService.getConfig();
  const registerSchema = Yup.object().shape({}).concat(GeneralSymptomsQuestions.schema());

  const patientState = route.params?.assessmentData?.patientData?.patientState;

  function onSubmit(values: TGeneralSymptomsData, formikHelpers: FormikHelpers<TGeneralSymptomsData>) {
    assessmentService.saveAssessment(GeneralSymptomsQuestions.createAssessment(values, patientState?.hasHayfever));
    assessmentCoordinator.gotoNextScreen(route.name);
    formikHelpers.setSubmitting(false);
  }

  return (
    <Screen profile={patientState?.profile} testID="general-symptoms-screen">
      <ProgressHeader currentStep={1} maxSteps={6} title={i18n.t('describe-symptoms.general-symptoms')} />

      <Formik
        initialValues={{
          ...GeneralSymptomsQuestions.initialFormValues(config?.defaultTemperatureUnit),
        }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props) => {
          return (
            <Form style={{ flexGrow: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <GeneralSymptomsQuestions formikProps={props} hasHayfever={patientState?.hasHayfever} />
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

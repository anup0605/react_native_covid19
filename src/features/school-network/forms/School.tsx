import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ValidationError } from '@covid/components/ValidationError';
import { TPatientData } from '@covid/core/patient/PatientData';
import { schoolService } from '@covid/core/schools/SchoolService';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { styling } from '@covid/themes';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

interface IProps {
  patientData: TPatientData;
}

export default function SchoolForm({ patientData }: IProps) {
  const validationSchema = Yup.object().shape({
    schoolCode: Yup.string()
      .required('Please enter your school code.')
      .matches(/^[a-zA-Z0-9_-]{7}$/, 'Code contains seven characters'),
  });

  return (
    <Formik
      initialValues={{ schoolCode: '' }}
      onSubmit={async ({ schoolCode }, FormikProps) => {
        try {
          const response = await schoolService.getSchoolById(schoolCode);
          NavigatorService.navigate('ConfirmSchool', {
            patientData,
            school: response[0],
          });
        } catch (error) {
          FormikProps.setFieldError('schoolId', 'Incorrect code');
        }
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <GenericTextField
            showError
            formikProps={formikProps}
            maxLength={7}
            name="schoolCode"
            placeholder={i18n.t('school-networks.join-school.school-code-placeholder')}
          />
          <View style={styling.flex} />
          {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
            <ValidationError error={i18n.t('validation-error-text')} />
          ) : null}
          <BrandedButton onPress={formikProps.handleSubmit}>{i18n.t('school-networks.join-school.cta')}</BrandedButton>
        </Form>
      )}
    </Formik>
  );
}

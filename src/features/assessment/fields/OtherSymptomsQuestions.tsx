import { TextareaWithCharCount } from '@covid/components';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ISymptomQuestions } from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export type TOtherSymptomsData = {
  otherSymptoms: string;
};

type TProps = {
  formikProps: FormikProps<TOtherSymptomsData>;
};

export const OtherSymptomsQuestions: ISymptomQuestions<TProps, TOtherSymptomsData> = (props: TProps) => {
  const { formikProps } = props;

  return (
    <TextareaWithCharCount
      bordered
      onChangeText={formikProps.handleChange('otherSymptoms')}
      placeholder={i18n.t('placeholder-optional-question')}
      style={{
        marginBottom: 16,
        marginTop: 32,
      }}
      testID="input-other-symptoms"
      textAreaStyle={{ borderRadius: 8 }}
      value={formikProps.values.otherSymptoms}
    />
  );
};

OtherSymptomsQuestions.initialFormValues = (): TOtherSymptomsData => {
  return {
    otherSymptoms: '',
  };
};

OtherSymptomsQuestions.schema = () => {
  return Yup.object();
};

OtherSymptomsQuestions.createAssessment = (formData: TOtherSymptomsData): Partial<TAssessmentInfosRequest> => {
  return {
    other_symptoms: formData.otherSymptoms ? formData.otherSymptoms : null,
  };
};

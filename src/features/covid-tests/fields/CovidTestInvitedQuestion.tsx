import { YesNoField } from '@covid/components/inputs/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import { isZoeInviteOfferTest } from '../helpers';

export interface ICovidTestInvitedData {
  invitedToTest: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestInvitedData>;
  test?: TCovidTest;
}

interface ICovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: TCovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TCovidTest>;
}

export const CovidTestInvitedQuestion: ICovidTestInvitedQuestion<IProps, ICovidTestInvitedData> = (props: IProps) => {
  const { formikProps } = props;
  return isGBCountry() ? (
    <YesNoField
      required
      error={formikProps.touched.invitedToTest && formikProps.errors.invitedToTest}
      label={i18n.t('covid-test.question-invite-to-test')}
      onValueChange={formikProps.handleChange('invitedToTest')}
      selectedValue={formikProps.values.invitedToTest}
      testID="covid-test-invited-question"
    />
  ) : (
    <></>
  );
};

CovidTestInvitedQuestion.initialFormValues = (test?: TCovidTest): ICovidTestInvitedData => {
  let invitedToTest = '';
  if (test?.id && test.invited_to_test !== null) {
    invitedToTest = test.invited_to_test ? 'yes' : 'no';
  }

  return {
    invitedToTest,
  };
};

CovidTestInvitedQuestion.schema = () => {
  return isGBCountry()
    ? Yup.object().shape({
        invitedToTest: Yup.string().when('mechanism', {
          is: (mechanism) => {
            return isZoeInviteOfferTest(mechanism);
          },
          then: Yup.string().required(i18n.t('please-select-option')),
        }),
      })
    : Yup.object().shape({});
};

CovidTestInvitedQuestion.createDTO = (formData: ICovidTestInvitedData): Partial<TCovidTest> => {
  return {
    ...(isGBCountry() && formData.invitedToTest && { invited_to_test: formData.invitedToTest === 'yes' }),
  } as Partial<TCovidTest>;
};

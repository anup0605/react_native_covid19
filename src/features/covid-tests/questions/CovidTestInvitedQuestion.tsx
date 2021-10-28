import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import CovidTestInfoIcon from '@covid/features/covid-tests/components/CovidTestInfoIcon';
import {
  isOldVersionAntibodyInviteTest,
  isZoeInviteOfferTest,
  showDualAntibodyTestUI,
} from '@covid/features/covid-tests/helpers';
import { CovidTestThrNumberInfoModal } from '@covid/features/covid-tests/modals/CovidTestThrNumberInfoModal';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestInvitedData {
  invitedToTest: string;
  thrNumber: string;
  thrNumberUnknown: string;
}

export interface ICovidTestInvitedFormikData extends ICovidTestInvitedData {
  mechanism: ECovidTestMechanismOptions;
}

interface IProps {
  formikProps: FormikProps<ICovidTestInvitedFormikData>;
  test?: TCovidTest;
}

interface ICovidTestInvitedQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: TCovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TCovidTest>;
}

export const CovidTestInvitedQuestion: ICovidTestInvitedQuestion<IProps, ICovidTestInvitedData> = (props: IProps) => {
  const { formikProps } = props;
  const [showThrModal, setShowThrModal] = React.useState<boolean>(false);

  const clearThrNumberAndSetAsUnknown = (value: string) => {
    formikProps.setFieldValue('thrNumber', '');
    formikProps.setFieldValue('thrNumberUnknown', value);
  };

  return isGBCountry() ? (
    <>
      <CovidTestThrNumberInfoModal onRequestClose={() => setShowThrModal(false)} visible={showThrModal} />
      <YesNoField
        required
        error={formikProps.touched.invitedToTest && formikProps.errors.invitedToTest}
        label={i18n.t('covid-test.question-invite-to-test')}
        onValueChange={formikProps.handleChange('invitedToTest')}
        selectedValue={formikProps.values.invitedToTest}
        testID="covid-test-invited-question"
      />
      {props.test && isOldVersionAntibodyInviteTest(props.test)
        ? null
        : showDualAntibodyTestUI(formikProps.values.mechanism, formikProps.values.invitedToTest) && (
            <>
              <GenericTextField
                required
                showError
                description={i18n.t('covid-test.question-thr-number-description')}
                formikProps={formikProps}
                IconComponent={CovidTestInfoIcon}
                iconOnPress={() => setShowThrModal(true)}
                label={i18n.t('covid-test.question-thr-number')}
                maxLength={9}
                name="thrNumber"
                onFocus={() => formikProps.setFieldValue('thrNumberUnknown', '')}
                placeholder="XXXXXXXXX-THR"
                style={{ marginTop: sizes.xl }}
              />

              <RadioInput
                items={[{ label: i18n.t('covid-test.picker-dont-know-thr'), value: 'dont_know' }]}
                onValueChange={(value) => clearThrNumberAndSetAsUnknown(value)}
                selectedValue={formikProps.values.thrNumberUnknown}
                style={{ marginVertical: 0 }}
                testID="covid-test-thr-number"
              />
            </>
          )}
    </>
  ) : (
    <></>
  );
};

CovidTestInvitedQuestion.initialFormValues = (test?: TCovidTest): ICovidTestInvitedData => {
  function getInvitedToTest() {
    if (test?.id) {
      if (test.invited_to_test === null) {
        return '';
      }
      return test.invited_to_test ? 'yes' : 'no';
    }
    return '';
  }

  let thrNumber = '';
  let thrNumberUnknown = '';

  if (test?.id) {
    if (test.thriva_test_id) {
      thrNumber = test.thriva_test_id;
    } else {
      thrNumberUnknown = 'dont_know';
    }
  }

  return {
    invitedToTest: getInvitedToTest(),
    thrNumber,
    thrNumberUnknown,
  };
};

CovidTestInvitedQuestion.schema = () => {
  return isGBCountry()
    ? Yup.object().shape(
        {
          invitedToTest: Yup.string().when('mechanism', {
            is: (mechanism) => {
              return isZoeInviteOfferTest(mechanism);
            },
            then: Yup.string().required(i18n.t('please-select-option')),
          }),
          thrNumber: Yup.string().when(['thrNumberUnknown', 'mechanism', 'invitedToTest'], {
            is: (thrNumberUnknown, mechanism, invitedToTest) =>
              showDualAntibodyTestUI(mechanism, invitedToTest) && (!thrNumberUnknown || thrNumberUnknown.length === 0),
            otherwise: Yup.string().notRequired(),
            then: Yup.string()
              .required(i18n.t('covid-test.required-thr-number'))
              .test('digits', i18n.t('covid-test.required-thr-format'), (value) => (value ? /^\d+$/.test(value) : true))
              .test('length', i18n.t('covid-test.required-thr-length'), (value) => (value ? value.length === 9 : true)),
          }),
          thrNumberUnknown: Yup.string().when(['thrNumber', 'mechanism', 'invitedToTest'], {
            is: (thrNumber, mechanism, invitedToTest) =>
              showDualAntibodyTestUI(mechanism, invitedToTest) && (!thrNumber || thrNumber.length === 0),
            otherwise: Yup.string().notRequired(),
            then: Yup.string().required(),
          }),
        },
        // needed to prevent circular calculation error
        [['thrNumber', 'thrNumberUnknown']],
      )
    : Yup.object().shape({});
};

CovidTestInvitedQuestion.createDTO = (formData: ICovidTestInvitedData): Partial<TCovidTest> => {
  return {
    ...(isGBCountry() && formData.invitedToTest && { invited_to_test: formData.invitedToTest === 'yes' }),
    ...(isGBCountry() && !!formData.thrNumber && { thriva_test_id: formData.thrNumber }),
    ...(isGBCountry() && !!formData.thrNumberUnknown && { thriva_test_id: null }),
  } as Partial<TCovidTest>;
};

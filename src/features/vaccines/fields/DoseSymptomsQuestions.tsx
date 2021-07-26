import InfoCircle from '@assets/icons/InfoCircle';
import { TextareaWithCharCount } from '@covid/components';
import { CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { TDoseSymptomsRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  createSymptomCheckboxes,
  IDoseSymptomQuestions,
  TSymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/themes/theme/colors';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export type TDoseSymptomsData = TDoseSymptomsCheckBoxData & TDoseSymptomsFollowUpData;

type TDoseSymptomsCheckBoxData = {
  pain: boolean;
  redness: boolean;
  swelling: boolean;
  glands: boolean;
  warmth: boolean;
  itch: boolean;
  tenderness: boolean;
  bruising: boolean;
  other: boolean;
};

type TDoseSymptomsFollowUpData = {
  otherSymptoms: string;
};

type TProps = {
  formikProps: FormikProps<TDoseSymptomsData>;
};

export const DoseSymptomsQuestions: IDoseSymptomQuestions<TProps, TDoseSymptomsData> = (props: TProps) => {
  const { formikProps } = props;

  const checkboxes: TSymptomCheckBoxData<TDoseSymptomsCheckBoxData, TDoseSymptomsFollowUpData>[] = [
    { label: i18n.t('vaccines.dose-symptoms.pain'), value: 'pain' },
    { label: i18n.t('vaccines.dose-symptoms.redness'), value: 'redness' },
    { label: i18n.t('vaccines.dose-symptoms.swelling'), value: 'swelling' },
    { label: i18n.t('vaccines.dose-symptoms.glands'), value: 'glands' },
    { label: i18n.t('vaccines.dose-symptoms.warmth'), value: 'warmth' },
    { label: i18n.t('vaccines.dose-symptoms.itch'), value: 'itch' },
    { label: i18n.t('vaccines.dose-symptoms.tenderness'), value: 'tenderness' },
    { label: i18n.t('vaccines.dose-symptoms.bruising'), value: 'bruising' },
    { label: i18n.t('vaccines.dose-symptoms.other'), value: 'other' },
  ];

  return (
    <View style={{ marginVertical: 8 }}>
      <RegularText style={{ paddingBottom: 8 }}>{i18n.t('vaccines.dose-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>

      {formikProps.values.other ? (
        <>
          <View style={{ flexDirection: 'row', marginVertical: 16, paddingRight: 32 }}>
            <View style={{ paddingRight: 8 }}>
              <InfoCircle color={colors.burgundy.main.bgColor} />
            </View>
            <View>
              <RegularText style={{ color: colors.burgundy.main.bgColor }}>
                {i18n.t('vaccines.dose-symptoms.other-info')}
              </RegularText>
            </View>
          </View>

          <TextareaWithCharCount
            bordered
            maxLength={500}
            onChangeText={formikProps.handleChange('otherSymptoms')}
            placeholder={i18n.t('vaccines.dose-symptoms.other-placeholder')}
            rowSpan={5}
            textAreaStyle={{ borderRadius: 8 }}
            value={formikProps.values.otherSymptoms}
          />
        </>
      ) : null}
    </View>
  );
};

DoseSymptomsQuestions.initialFormValues = (): TDoseSymptomsData => {
  return {
    bruising: false,
    glands: false,
    itch: false,
    other: false,
    otherSymptoms: '',
    pain: false,
    redness: false,
    swelling: false,
    tenderness: false,
    warmth: false,
  };
};

DoseSymptomsQuestions.schema = () => {
  return Yup.object();
};

DoseSymptomsQuestions.createDoseSymptoms = (formData: TDoseSymptomsData): Partial<TDoseSymptomsRequest> => {
  return {
    bruising: formData.bruising,
    itch: formData.itch,
    pain: formData.pain,
    redness: formData.redness,
    swelling: formData.swelling,
    swollen_armpit_glands: formData.glands,
    tenderness: formData.tenderness,
    warmth: formData.warmth,
    ...(formData.other && { other: formData.otherSymptoms }),
  };
};

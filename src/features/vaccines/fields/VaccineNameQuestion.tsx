import { RadioInput } from '@covid/components/inputs/RadioInput';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import {
  EPlaceboStatus,
  EVaccineBrands,
  TVaccineRequest,
  vaccineBrandDisplayName,
} from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';

import { IVaccineDoseData } from './VaccineDoseQuestion';

interface IProps {
  firstDose?: boolean;
  formikProps: FormikProps<IVaccineDoseData>;
  showUpdatedVersion?: boolean;
}

export interface IVaccineNameQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: TVaccineRequest) => Partial<Data>;
}

export const VaccineNameQuestion: IVaccineNameQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  const gbVaccineOptionsBase = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.ASTRAZENECA], value: EVaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const gbVaccineOptionsUpdated = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.ASTRAZENECA], value: EVaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: i18n.t('vaccines.your-vaccine.name-trial'), value: EVaccineBrands.TRIAL },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const gbVaccineOptions = props.showUpdatedVersion ? gbVaccineOptionsUpdated : gbVaccineOptionsBase;

  const seVaccineOptionsBase = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.ASTRAZENECA], value: EVaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const seVaccineOptions = seVaccineOptionsBase;

  const usVaccineOptionsBase = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const usVaccineOptionsUpdated = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-trial'), value: EVaccineBrands.TRIAL },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const usVaccineOptions = props.showUpdatedVersion ? usVaccineOptionsUpdated : usVaccineOptionsBase;

  const nameOptions = isGBCountry() ? gbVaccineOptions : isSECountry() ? seVaccineOptions : usVaccineOptions;

  const descriptionOptions = [
    { label: 'mRNA', value: 'mrna' },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'not_sure' },
  ];

  const placeboOptions = [
    { label: i18n.t('vaccines.your-vaccine.placebo-yes'), value: EPlaceboStatus.YES },
    { label: i18n.t('vaccines.your-vaccine.placebo-no'), value: EPlaceboStatus.NO },
    { label: i18n.t('vaccines.your-vaccine.placebo-not-sure'), value: EPlaceboStatus.UNSURE },
  ];

  const renderNameInput = () => {
    const brandField = props.firstDose ? props.formikProps.values.firstBrand : props.formikProps.values.secondBrand;
    const brandString = props.firstDose ? 'firstBrand' : 'secondBrand';
    const brandTouched = props.firstDose ? props.formikProps.touched.firstBrand : props.formikProps.touched.secondBrand;
    const brandError = props.firstDose ? props.formikProps.errors.firstBrand : props.formikProps.errors.secondBrand;

    return (
      <RadioInput
        required
        error={brandTouched ? brandError : ''}
        items={nameOptions}
        label={i18n.t('vaccines.your-vaccine.label-name')}
        onValueChange={props.formikProps.handleChange(brandString)}
        selectedValue={brandField}
        testID="input-your-vaccine"
      />
    );
  };

  const renderNameInputUpdated = () => {
    const brandField = props.formikProps.values.brand;
    const brandString = 'brand';
    const brandTouched = props.formikProps.touched.brand;
    const brandError = props.formikProps.errors.brand;

    return (
      <RadioInput
        required
        error={brandTouched ? brandError : ''}
        items={nameOptions}
        label={i18n.t('vaccines.your-vaccine.label-name-updated')}
        onValueChange={props.formikProps.handleChange(brandString)}
        selectedValue={brandField}
        testID="input-your-vaccine"
      />
    );
  };

  // Only for old version
  const renderDescriptionInput = () => {
    // Use value of relevant brand to show (or not) the description field
    const brandField = props.firstDose ? props.formikProps.values.firstBrand : props.formikProps.values.secondBrand;
    if (brandField !== 'not_sure') {
      return null;
    }

    const descriptionField = props.firstDose
      ? props.formikProps.values.firstDescription
      : props.formikProps.values.secondDescription;
    const descriptionString = props.firstDose ? 'firstDescription' : 'secondDescription';
    const descriptionTouched = props.firstDose
      ? props.formikProps.touched.firstDescription
      : props.formikProps.touched.secondDescription;
    const descriptionError = props.firstDose
      ? props.formikProps.errors.firstDescription
      : props.formikProps.errors.secondDescription;

    return (
      <RadioInput
        required
        error={descriptionTouched ? descriptionError : ''}
        items={descriptionOptions}
        label={i18n.t('vaccines.your-vaccine.label-name-other')}
        onValueChange={props.formikProps.handleChange(descriptionString)}
        selectedValue={descriptionField}
      />
    );
  };

  // Only for updated version
  const renderPlaceboInput = () => {
    const brandField = props.formikProps.values.brand;
    if (brandField !== 'vaccine_trial') {
      return null;
    }

    const placeboField = props.formikProps.values.placebo;
    const placeboString = 'placebo';
    const placeboTouched = props.formikProps.touched.placebo;
    const placeboError = props.formikProps.errors.placebo;

    return (
      <RadioInput
        required
        error={placeboTouched ? placeboError : ''}
        items={placeboOptions}
        label={i18n.t('vaccines.your-vaccine.label-placebo')}
        onValueChange={props.formikProps.handleChange(placeboString)}
        selectedValue={placeboField}
      />
    );
  };

  return (
    <>
      {props.showUpdatedVersion ? <View>{renderNameInputUpdated()}</View> : <View>{renderNameInput()}</View>}
      {props.showUpdatedVersion ? <View>{renderPlaceboInput()}</View> : <View>{renderDescriptionInput()}</View>}
    </>
  );
};

VaccineNameQuestion.initialFormValues = (vaccine?: TVaccineRequest): Partial<IVaccineDoseData> => {
  return {
    firstBrand: vaccine?.doses[0]?.brand,
    firstDescription: vaccine?.doses[0]?.description,
    secondBrand: vaccine?.doses[1]?.brand,
    secondDescription: vaccine?.doses[1]?.description,
  };
};

import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { EVaccineMechanisms, EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { IVaccineDoseData, VaccineDoseQuestion } from '@covid/features/vaccines/fields/VaccineDoseQuestion';
import { showVaccineWarningAlert } from '@covid/features/vaccines/utils';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { formatDateToPost } from '@covid/utils/datetime';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'AboutYourVaccine'>;
};

interface IAboutYourVaccineData extends IVaccineDoseData {}

export function AboutYourVaccineScreen({ route }: TProps) {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const assessmentData = route.params?.assessmentData;
  const checkIfChild = route.params?.assessmentData.patientData.patientState.isChild || false;

  const registerSchema = Yup.object().shape({}).concat(VaccineDoseQuestion.schema(checkIfChild));

  const doseIdBeingEdited = route.params?.editDoseId;
  const doseBeingEdited =
    doseIdBeingEdited !== undefined
      ? assessmentData.vaccineData?.doses.find((dose) => dose.id === doseIdBeingEdited)
      : undefined;

  const setMechanism = (formValues: IAboutYourVaccineData) => {
    if (formValues.vaccineType === EVaccineTypes.COVID_VACCINE) {
      return null;
    }
    if (formValues.vaccineType === EVaccineTypes.SEASONAL_FLU && checkIfChild === false) {
      return EVaccineMechanisms.ARM_INJECTION;
    }
    if (formValues.vaccineMechanism) {
      return formValues.vaccineMechanism;
    }
    return null;
  };

  const setBrand = (formValues: IAboutYourVaccineData) => {
    if (formValues.vaccineType === EVaccineTypes.SEASONAL_FLU) {
      return null;
    }
    if (formValues.brand) {
      return formValues.brand;
    }
    return null;
  };

  const assignDoseSequence = (doses: TDose[]) => {
    doses
      .sort((a, b) => Date.parse(a.date_taken_specific) - Date.parse(b.date_taken_specific))
      .map((dose, index) => (dose.sequence = index + 1));
  };

  const onSubmit = async (values: IAboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);
      const vaccine: Partial<TVaccineRequest> = {
        ...assessmentData?.vaccineData,
        patient: assessmentData?.patientData.patientId,
      };

      if (!vaccine.doses) {
        vaccine.doses = [];
      }

      // Remove edited dose before re-adding below
      if (doseBeingEdited) {
        vaccine.doses = vaccine.doses.filter((dose) => dose.id !== doseBeingEdited.id);
      }

      const latestDose: Partial<TDose> = {
        ...doseBeingEdited,
        batch_number: values.batchNumber,
        brand: setBrand(values),
        date_taken_specific: formatDateToPost(values.doseDate),
        mechanism: setMechanism(values),
        placebo: values.placebo,
        vaccine_type: values.vaccineType,
      };
      vaccine.doses.push(latestDose as TDose);

      const fluDoses = vaccine.doses.filter((dose) => dose.vaccine_type === EVaccineTypes.SEASONAL_FLU);
      const covidDoses = vaccine.doses.filter((dose) => dose.vaccine_type === EVaccineTypes.COVID_VACCINE);

      assignDoseSequence(fluDoses);
      assignDoseSequence(covidDoses);

      await vaccineService.saveVaccineAndDoses(assessmentData?.patientData.patientId, vaccine);

      returnToListView(values.vaccineType);

      // Only show the alert when adding a new COVID vaccine.
      if (doseIdBeingEdited === undefined && values.vaccineType !== EVaccineTypes.SEASONAL_FLU) {
        showVaccineWarningAlert();
      }
    }
  };

  const returnToListView = (vaccineType: EVaccineTypes = EVaccineTypes.COVID_VACCINE) => {
    NavigatorService.navigate('VaccineList', {
      assessmentData,
      vaccineType,
    });
  };

  function promptDelete() {
    // Note that the "delete" is actually an UPDATE on the Vaccine Dose collection, and takes the entire vaccine obj as payload
    const vaccineWithoutDeletedDose = {
      ...assessmentData.vaccineData,
      doses: assessmentData.vaccineData?.doses.filter((dose) => dose.id !== doseIdBeingEdited),
    };
    Alert.alert(
      i18n.t('vaccines.vaccine-list.delete-vaccine-title'),
      i18n.t('vaccines.vaccine-list.delete-vaccine-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: () => {
            vaccineService
              .saveVaccineAndDoses(assessmentData?.patientData.patientId, vaccineWithoutDeletedDose)
              .then(() => {
                assessmentCoordinator.resetVaccine();
                returnToListView();
              });
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }

  const buildInitialValues = (): IVaccineDoseData => {
    return {
      batchNumber: doseBeingEdited?.batch_number ?? '',
      brand: doseBeingEdited?.brand ?? undefined,
      doseDate: doseBeingEdited?.date_taken_specific ? moment(doseBeingEdited.date_taken_specific).toDate() : undefined,
      placebo: doseBeingEdited?.placebo ?? undefined,
      vaccineMechanism: doseBeingEdited?.mechanism ?? undefined,
      vaccineType: doseBeingEdited?.vaccine_type ?? undefined,
    };
  };

  const renderDeleteOrBack = () => {
    return doseBeingEdited ? (
      <TouchableOpacity onPress={promptDelete}>
        <ClickableText onPress={promptDelete} style={styles.clickableText}>
          {i18n.t('vaccines.your-vaccine.delete')}
        </ClickableText>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={navigation.goBack}>
        <ClickableText onPress={navigation.goBack} style={styles.clickableText}>
          {i18n.t('vaccines.your-vaccine.cancel')}
        </ClickableText>
      </TouchableOpacity>
    );
  };

  return (
    <Screen profile={assessmentData?.patientData.profile} testID="about-your-vaccine-screen">
      <HeaderText style={{ marginBottom: sizes.xs }} testID="about-your-vaccine-screen-header">
        {i18n.t(doseIdBeingEdited !== undefined ? 'vaccines.your-vaccine.edit-dose' : 'vaccines.your-vaccine.add-dose')}
      </HeaderText>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{ ...buildInitialValues() }}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(props: FormikProps<IAboutYourVaccineData>) => {
          return (
            <Form hasRequiredFields style={styles.flex}>
              <VaccineDoseQuestion
                formikProps={props as FormikProps<IVaccineDoseData>}
                isChild={checkIfChild}
                testID="vaccine-dose-question"
              />

              <View style={styles.footerWrapper}>
                {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} style={styling.marginBottom} />
                ) : null}

                <BrandedButton enabled={props.isValid} onPress={props.handleSubmit} testID="button-submit">
                  {i18n.t('vaccines.your-vaccine.save-dose')}
                </BrandedButton>

                {renderDeleteOrBack()}
              </View>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  clickableText: {
    marginVertical: sizes.m,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  footerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: sizes.xxl,
  },
  header: {
    marginBottom: sizes.xl,
    marginTop: sizes.xxl,
  },
  infoText: {
    color: colors.linkBlue,
    marginLeft: sizes.m,
  },
  infoWrapper: {
    flexDirection: 'row',
    marginVertical: sizes.xl,
  },
  marginBottom: {
    marginBottom: sizes.m,
  },
});

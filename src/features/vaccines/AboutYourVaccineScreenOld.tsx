import QuestionCircle from '@assets/icons/QuestionCircle';
import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { Screen } from '@covid/components/Screen';
import { ClickableText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { EVaccineBrands, EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { IVaccineDoseData, VaccineDoseQuestion } from '@covid/features/vaccines/fields/VaccineDoseQuestion';
import { showVaccineWarningAlert } from '@covid/features/vaccines/utils';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { formatDateToPost } from '@covid/utils/datetime';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';

type TProps = {
  route: RouteProp<TScreenParamList, 'AboutYourVaccineOld'>;
};

const registerSchema = Yup.object().shape({}).concat(VaccineDoseQuestion.schema());

interface IAboutYourVaccineData extends IVaccineDoseData {}

export function AboutYourVaccineScreenOld({ route }: TProps) {
  const coordinator = assessmentCoordinator;
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [hasSecondDose, setHasSecondDose] = React.useState<string | undefined>(undefined);
  const assessmentData = route.params?.assessmentData;

  function isJohnsonVaccine() {
    return (
      assessmentData?.vaccineData &&
      assessmentData?.vaccineData.doses[0] &&
      assessmentData?.vaccineData.brand === EVaccineBrands.JOHNSON
    );
  }

  function vaccineOrFormHasSecondDose() {
    if (isJohnsonVaccine()) {
      return false;
    }

    if (hasSecondDose !== undefined) {
      return hasSecondDose === 'yes';
    }
    return assessmentData?.vaccineData && assessmentData?.vaccineData.doses[1] !== undefined;
  }

  const processFormDataForSubmit = async (formData: IAboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);
      const vaccine: Partial<TVaccineRequest> = {
        ...assessmentData?.vaccineData,
        patient: assessmentData?.patientData.patientId,
        vaccine_type: EVaccineTypes.COVID_VACCINE,
      };
      const doses: Partial<TDose | undefined>[] = [];

      if (formData.firstDoseDate) {
        doses[0] = vaccine?.doses && vaccine?.doses[0] ? vaccine.doses[0] : undefined;
        const updatedDose: Partial<TDose> = {
          ...doses[0],
          batch_number: formData.firstBatchNumber,
          brand: formData.firstBrand,
          date_taken_specific: formatDateToPost(formData.firstDoseDate),
          description: formData.firstDescription,
          sequence: 1,
        };
        doses[0] = updatedDose;
      }

      // if setHasSecondDose is manually set to 'no', the data will not be saved (even if entered)
      if (vaccineOrFormHasSecondDose()) {
        doses[1] = vaccine?.doses && vaccine?.doses[1] ? vaccine.doses[1] : undefined;
        const updatedDose: Partial<TDose> = {
          ...doses[1],
          batch_number: formData.secondBatchNumber,
          brand: formData.secondBrand,
          date_taken_specific: formatDateToPost(formData.secondDoseDate),
          description: formData.secondDescription,
          sequence: 2,
        };
        doses[1] = updatedDose;
      } else {
        // unlinking a "deleted" dose needs work in this ticket:
        // https://www.notion.so/joinzoe/Delete-vaccine-dose-if-user-sets-second-to-no-on-edit-2dbfcaad27e44068af02ce980e5a98da
      }

      await vaccineService.saveVaccineAndDoses(assessmentData?.patientData.patientId, { ...vaccine, doses });

      NavigatorService.navigate('VaccineListFeatureToggle', {
        assessmentData,
      });

      // Only show the alert when adding a new vaccine.
      if (!assessmentData?.vaccineData) {
        showVaccineWarningAlert();
      }
    }
  };

  const checkDateChangePrompt = (formData: IAboutYourVaccineData) => {
    Alert.alert(
      i18n.t('vaccines.your-vaccine.date-change-confirm'),
      i18n.t('vaccines.your-vaccine.date-change-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: () => {
            processFormDataForSubmit(formData);
          },
          text: i18n.t('confirm'),
        },
      ],
      { cancelable: false },
    );
  };

  function promptDeleteVaccine() {
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
            vaccineService.deleteVaccine(assessmentData?.vaccineData.id).then(() => {
              coordinator.resetVaccine();
              NavigatorService.navigate('VaccineListFeatureToggle', {
                assessmentData,
              });
            });
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }

  const dateHasBeenEdited = (formData: IAboutYourVaccineData) => {
    // This is quite verbose vs a one-line return for easier reading
    if (assessmentData?.vaccineData === undefined || assessmentData?.vaccineData.doses === undefined) {
      return false;
    }

    const { doses } = assessmentData?.vaccineData;
    const dose1Date = doses[0]?.date_taken_specific;
    const dose2Date = doses[1]?.date_taken_specific;
    const formDate1 = formatDateToPost(formData.firstDoseDate);
    const formDate2 = formatDateToPost(formData.secondDoseDate);
    const date1Changed = dose1Date !== formDate1;
    const date2Changed = dose2Date !== undefined && dose2Date !== formDate2;

    return date1Changed || date2Changed;
  };

  const buildInitialValues = (vaccine?: TVaccineRequest): IVaccineDoseData => {
    return {
      firstBatchNumber: vaccine?.doses[0]?.batch_number ?? '',
      firstBrand: vaccine?.doses[0]?.brand ?? undefined,
      firstDescription: vaccine?.doses[0]?.description,
      firstDoseDate: vaccine?.doses[0]?.date_taken_specific
        ? moment(vaccine.doses[0].date_taken_specific).toDate()
        : undefined,
      secondBatchNumber: vaccine?.doses[1]?.batch_number ?? '',
      secondBrand: vaccine?.doses[1]?.brand ?? undefined,
      secondDescription: vaccine?.doses[1]?.description,
      secondDoseDate: vaccine?.doses[1]?.date_taken_specific
        ? moment(vaccine.doses[1].date_taken_specific).toDate()
        : undefined,
    };
  };

  return (
    <Screen profile={assessmentData?.patientData.profile} testID="about-your-vaccine-screen">
      <HeaderText>{i18n.t('vaccines.your-vaccine.title')}</HeaderText>
      <TouchableOpacity onPress={assessmentCoordinator.goToVaccineFindInfo} style={styles.infoWrapper}>
        <QuestionCircle colorIcon={colors.linkBlue} />
        <RegularText style={styles.infoText}>{i18n.t('vaccines.find-info.link')}</RegularText>
      </TouchableOpacity>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{ ...buildInitialValues(assessmentData?.vaccineData) }}
        onSubmit={(formData: IAboutYourVaccineData) =>
          // Show an alert if any date value has changed. The prompt confirm will call processFormDataForSubmit thereafter.
          dateHasBeenEdited(formData) ? checkDateChangePrompt(formData) : processFormDataForSubmit(formData)
        }
        validationSchema={registerSchema}
      >
        {(props: FormikProps<IAboutYourVaccineData>) => {
          return (
            <Form hasRequiredFields style={styles.flex}>
              <Header3Text style={styling.marginVertical}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
              <VaccineDoseQuestion
                firstDose
                formikProps={props as FormikProps<IVaccineDoseData>}
                testID="vaccine-first-dose-question"
              />
              {props.values.firstBrand && props.values.firstBrand !== EVaccineBrands.JOHNSON ? (
                <>
                  <Header3Text style={styles.header}>{i18n.t('vaccines.your-vaccine.second-dose')}</Header3Text>

                  <YesNoField
                    required
                    label={i18n.t('vaccines.your-vaccine.have-had-second')}
                    onValueChange={(value: string) => {
                      props.values.hasSecondDose = value === 'yes';
                      if (value === 'no') {
                        props.values.secondDoseDate = undefined;
                      }
                      setHasSecondDose(value);
                      props.validateForm();
                    }}
                    selectedValue={vaccineOrFormHasSecondDose() ? 'yes' : 'no'}
                  />
                  {vaccineOrFormHasSecondDose() ? (
                    <VaccineDoseQuestion
                      firstDose={false}
                      formikProps={props as FormikProps<IVaccineDoseData>}
                      testID="vaccine-second-dose-question"
                    />
                  ) : null}
                </>
              ) : null}

              <View style={styles.footerWrapper}>
                {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} style={styling.marginBottom} />
                ) : null}

                <BrandedButton enabled={props.isValid} onPress={props.handleSubmit} testID="button-submit">
                  {i18n.t('vaccines.your-vaccine.confirm')}
                </BrandedButton>

                {assessmentData?.vaccineData?.id ? (
                  <TouchableOpacity onPress={promptDeleteVaccine}>
                    <ClickableText style={styles.clickableText}>{i18n.t('vaccines.your-vaccine.delete')}</ClickableText>
                  </TouchableOpacity>
                ) : null}
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
    marginVertical: sizes.xl,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  footerWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: sizes.xl,
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

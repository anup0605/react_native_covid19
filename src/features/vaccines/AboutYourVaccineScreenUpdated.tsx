import { BrandedButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
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
  route: RouteProp<TScreenParamList, 'AboutYourVaccineUpdated'>;
};

const registerSchema = Yup.object().shape({}).concat(VaccineDoseQuestion.schemaUpdated());

interface IAboutYourVaccineData extends IVaccineDoseData {}

export function AboutYourVaccineScreenUpdated({ route }: TProps) {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const assessmentData = route.params?.assessmentData;

  const doseIndexBeingEdited = route.params?.editIndex;
  const doseBeingEdited =
    doseIndexBeingEdited !== undefined ? assessmentData.vaccineData?.doses[doseIndexBeingEdited] : undefined;

  const processFormDataForSubmit = async (formData: IAboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);
      const vaccine: Partial<TVaccineRequest> = {
        ...assessmentData?.vaccineData,
        patient: assessmentData?.patientData.patientId,
        vaccine_type: EVaccineTypes.COVID_VACCINE,
      };

      if (!vaccine.doses) {
        vaccine.doses = [];
      }

      const latestDose: Partial<TDose> = {
        ...doseBeingEdited,
        batch_number: formData.batchNumber,
        brand: formData.brand,
        date_taken_specific: formatDateToPost(formData.doseDate),
        placebo: formData.placebo,
      };
      vaccine.doses.push(latestDose);
      vaccine.doses
        .sort((a, b) => Date.parse(a.date_taken_specific) - Date.parse(b.date_taken_specific))
        .map((dose, index) => (dose.sequence = index + 1));

      await vaccineService.saveVaccineAndDoses(assessmentData?.patientData.patientId, vaccine);

      returnToListView();

      // Only show the alert when adding a new vaccine.
      if (doseIndexBeingEdited === undefined) {
        showVaccineWarningAlert();
      }
    }
  };

  const returnToListView = () =>
    NavigatorService.navigate('VaccineListFeatureToggle', {
      assessmentData,
      viewName: 'LIST',
    });

  function promptDelete() {
    // Note that the "delete" is actually an UPDATE on the Vaccine Dose collection, and takes the entire vaccine obj as payload
    const vaccineWithoutDeletedDose: Partial<TDose> = {
      ...assessmentData.vaccineData,
      doses: assessmentData.vaccineData?.doses.filter((dose: TDose, index: number) => index !== doseIndexBeingEdited),
    };
    Alert.alert(
      i18n.t('vaccines.vaccine-list-updated.delete-vaccine-title'),
      i18n.t('vaccines.vaccine-list-updated.delete-vaccine-text'),
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
        {i18n.t(
          doseIndexBeingEdited !== undefined ? 'vaccines.your-vaccine.edit-dose' : 'vaccines.your-vaccine.add-dose',
        )}
      </HeaderText>
      <Formik
        validateOnChange
        validateOnMount
        initialValues={{ ...buildInitialValues() }}
        onSubmit={processFormDataForSubmit}
        validationSchema={registerSchema}
      >
        {(props: FormikProps<IAboutYourVaccineData>) => {
          return (
            <Form hasRequiredFields style={styles.flex}>
              <VaccineDoseQuestion
                showUpdatedVersion
                formikProps={props as FormikProps<IVaccineDoseData>}
                testID="vaccine-first-dose-question"
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

import { BrandedButton } from '@covid/components';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { Form } from '@covid/components/Form';
import { GenericTextField } from '@covid/components/GenericTextField';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { Coordinator, IUpdatePatient } from '@covid/core/Coordinator';
import { isUSCountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { patientCoordinator } from '@covid/core/patient/PatientCoordinator';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

type TYourStudyProps = {
  route: RouteProp<ScreenParamList, 'YourStudy'>;
};

type TCohortDefinition = {
  key: string;
  label: string;
  country: string;
};

const initialFormValues = {
  clinicalStudyContacts: '',
  clinicalStudyInstitutions: '',
  clinicalStudyNames: '',
  clinicalStudyNctIds: '',
};

interface IYourStudyData {
  clinicalStudyNames: string;
  clinicalStudyContacts: string;
  clinicalStudyInstitutions: string;
  clinicalStudyNctIds: string;
}

type TState = {
  errorMessage: string;
};

const allCohorts: TCohortDefinition[] = [
  {
    country: 'GB',
    key: 'is_in_uk_guys_trust',
    label: "Guys & St. Thomas' Hospital Trust",
  },
  {
    country: 'GB',
    key: 'is_in_uk_nhs_asymptomatic_study',
    label: 'NHS Asymptomatic Staff Testing Pilot',
  },
  {
    country: 'GB',
    key: 'is_in_uk_twins',
    label: 'Twins UK',
  },
  {
    country: 'GB',
    key: 'is_in_uk_biobank',
    label: 'UK Biobank',
  },
  {
    country: 'US',
    key: 'is_in_us_covid_siren',
    label: 'COVID SIREN',
  },
  {
    country: 'US',
    key: 'is_in_us_nurses_study',
    label: "Harvard Nurses' Health Studies",
  },
  {
    country: 'US',
    key: 'is_in_us_growing_up_today',
    label: 'Harvard Growing Up Today Study',
  },
  {
    country: 'US',
    key: 'is_in_us_harvard_health_professionals',
    label: 'Harvard Health Professionals Follow Up Study',
  },
  {
    country: 'US',
    key: 'is_in_us_mass_general_brigham',
    label: 'Mass General / Brigham',
  },
  {
    country: 'US',
    key: 'is_in_us_origins',
    label: 'ORIGINS-Columbia University',
  },
  {
    country: 'US',
    key: 'is_in_us_school_reopenings',
    label: 'Schools Reopenings Study',
  },
  {
    country: 'US',
    key: 'is_in_us_partners_biobank',
    label: 'Partners Biobank',
  },
  {
    country: 'US',
    key: 'is_in_us_mass_eye_ear_infirmary',
    label: 'Mass Eye and Ear Infirmary',
  },
  {
    country: 'US',
    key: 'is_in_us_bwhs',
    label: "Black Women's Health Study",
  },
  {
    country: 'US',
    key: 'is_in_us_american_cancer_society_cancer_prevention_study_3',
    label: 'American Cancer Society Cancer Prevention Study-3',
  },
  {
    country: 'US',
    key: 'is_in_us_california_teachers',
    label: 'UCSD/COH California Teachers Study',
  },
  {
    country: 'US',
    key: 'is_in_us_aspree_xt',
    label: 'ASPREE-XT',
  },
  {
    country: 'US',
    key: 'is_in_us_multiethnic_cohort',
    label: 'Multiethnic Cohort Study',
  },
  {
    country: 'US',
    key: 'is_in_us_sister',
    label: 'The Sister Study',
  },
  {
    country: 'US',
    key: 'is_in_us_covid_flu_near_you',
    label: 'CovidNearYou / FluNearYou',
  },
  {
    country: 'US',
    key: 'is_in_us_chasing_covid',
    label: 'CHASING COVID - CUNY ISPH',
  },
  {
    country: 'US',
    key: 'is_in_us_environmental_polymorphisms',
    label: 'NIEHS Personalized Environment and Genes Study (PEGS)', // name changed on frontend on 15 Oct 2021. No change in backend.
  },
  {
    country: 'US',
    key: 'is_in_us_agricultural_health',
    label: 'The Agricultural Health Study (AHS)',
  },
  {
    country: 'US',
    key: 'is_in_us_gulf',
    label: 'The GuLF Study',
  },
  {
    country: 'US',
    key: 'is_in_us_predetermine',
    label: 'PREDETERMINE Study',
  },
  {
    country: 'US',
    key: 'is_in_us_promise_pcrowd',
    label: 'PROMISE/PCROWD Study',
  },
  {
    country: 'US',
    key: 'is_in_us_colocare',
    label: 'ColoCare Study',
  },
  {
    country: 'US',
    key: 'is_in_us_predict2',
    label: 'PREDICT 2',
  },
  {
    country: 'US',
    key: 'is_in_us_stanford_nutrition',
    label: 'Stanford Nutrition Studies Group',
  },
  {
    country: 'US',
    key: 'is_in_us_md_anderson_d3code',
    label: 'MD Anderson D3CODE Study',
  },
  {
    country: 'US',
    key: 'is_in_us_hispanic_colorectal_cancer',
    label: 'Hispanic Colorectal Cancer Study',
  },
  {
    country: 'US',
    key: 'is_in_us_colon_cancer_family_registry',
    label: 'Colon Cancer Family Registry',
  },
  {
    country: 'US',
    key: 'is_in_us_louisiana_state_university',
    label: 'Louisiana State University',
  },
  {
    country: 'US',
    key: 'is_in_us_northshore_genomic_health_initiative',
    label: 'NorthShore Genomic Health Initiative',
  },
  {
    country: 'US',
    key: 'is_in_us_c19_human_genetics',
    label: 'C19 Human Genetics Study',
  },
  {
    country: 'US',
    key: 'is_in_us_mary_washington_healthcare',
    label: 'Mary Washington Healthcare',
  },
  // For now, the NOTA is being sent to the backend and failing silently since the field doesn't exist, not to the users knowledge
  {
    country: 'GB',
    key: 'is_in_none_of_the_above',
    label: 'None of the above',
  },
];

export default class YourStudyScreen extends React.Component<TYourStudyProps, TState> {
  private coordinator: Coordinator & IUpdatePatient = this.props.route.params?.editing
    ? editProfileCoordinator
    : patientCoordinator;

  registerSchema = Yup.object().shape({
    clinicalStudyContact: Yup.string(),
    clinicalStudyInstitution: Yup.string(),
    clinicalStudyNames: Yup.string(),
    clinicalStudyNctId: Yup.string(),
  });

  constructor(props: TYourStudyProps) {
    super(props);

    this.state = {
      errorMessage: '',
    };
  }

  filterCohortsByCountry = (country: string) => {
    return allCohorts.filter((cohort) => {
      return cohort.country === country;
    });
  };

  getInitialFormValues = () => {
    const countrySpecificCohorts = this.filterCohortsByCountry(LocalisationService.userCountry);
    const patientInfo = this.props.route.params?.patientData?.patientInfo;
    if (this.props.route.params?.editing && patientInfo) {
      const patientFormData = {
        clinicalStudyContacts: patientInfo?.clinical_study_contacts ?? '',
        clinicalStudyInstitutions: patientInfo?.clinical_study_institutions ?? '',
        clinicalStudyNames: patientInfo?.clinical_study_names ?? '',
        clinicalStudyNctIds: patientInfo?.clinical_study_nct_ids ?? '',
      };
      countrySpecificCohorts.forEach((cohort) => {
        // @ts-ignore - error due to cohort keys being in allCohorts and not explicitly in the interface
        patientFormData[cohort.key] = !!patientInfo[cohort.key];
      });
      return patientFormData;
    }
    return {
      ...initialFormValues,
      ...this.buildInitCohortsValues(countrySpecificCohorts),
    };
  };

  buildInitCohortsValues = (cohorts: TCohortDefinition[]): { [index: string]: boolean } => {
    const initialValues: { [index: string]: boolean } = {};
    cohorts.forEach((cohort) => {
      initialValues[cohort.key] = false;
    });
    return initialValues;
  };

  onSubmit = (values: IYourStudyData) => {
    const infos = this.createPatientInfos(values);

    this.coordinator
      .updatePatientInfo(infos)
      .then(() => {
        this.coordinator.gotoNextScreen(this.props.route.name);
      })
      .catch(() => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  };

  createPatientInfos = (formData: IYourStudyData) => {
    // This is to split up the US specific fields, from the cohorts. This is a neat way to do it without repeating the country filtering logic above
    const { clinicalStudyNames, clinicalStudyContacts, clinicalStudyInstitutions, clinicalStudyNctIds, ...cohorts } =
      formData;

    let infos = { ...cohorts } as Partial<TPatientInfosRequest>;

    if (isUSCountry()) {
      infos = {
        ...cohorts,
        ...(clinicalStudyNames && { clinical_study_names: clinicalStudyNames }),
        ...(clinicalStudyContacts && { clinical_study_contacts: clinicalStudyContacts }),
        ...(clinicalStudyInstitutions && { clinical_study_institutions: clinicalStudyInstitutions }),
        ...(clinicalStudyNctIds && { clinical_study_nct_ids: clinicalStudyNctIds }),
      };
    }
    return infos;
  };

  render() {
    const countrySpecificCohorts = this.filterCohortsByCountry(LocalisationService.userCountry);

    return (
      <Screen simpleCallout profile={this.coordinator.patientData?.patientState?.profile} testID="your-study-screen">
        <Formik
          initialValues={this.getInitialFormValues()}
          onSubmit={this.onSubmit}
          validationSchema={this.registerSchema}
        >
          {(formikProps) => {
            return (
              <Form>
                <ProgressHeader currentStep={1} maxSteps={6} title={i18n.t('your-study.title')} />
                <RegularText style={{ marginBottom: sizes.m, marginTop: sizes.xl }}>
                  {i18n.t('your-study.label-cohort')}
                </RegularText>
                <CheckboxList>
                  {countrySpecificCohorts.map((cohort) => (
                    <CheckboxItem
                      key={cohort.key}
                      // @ts-ignore - error due to cohort keys being in allCohorts and not explicitly in the interface
                      onChange={(value: boolean) => {
                        if (cohort.key === 'is_in_none_of_the_above') {
                          // @ts-ignore - error due to cohort keys being in allCohorts and not explicitly in the interface
                          formikProps.setValues(this.buildInitCohortsValues(countrySpecificCohorts));
                        } else if (Object.keys(formikProps.values).includes('is_in_none_of_the_above')) {
                          formikProps.setFieldValue('is_in_none_of_the_above', false);
                        }
                        formikProps.setFieldValue(cohort.key, value);
                      }}
                      value={formikProps.values[cohort.key]}
                    >
                      {cohort.label}
                    </CheckboxItem>
                  ))}
                </CheckboxList>

                {isUSCountry() ? (
                  <>
                    <RegularText>{i18n.t('your-study.if-not')}</RegularText>

                    <GenericTextField
                      formikProps={formikProps}
                      label={i18n.t('your-study.add-study-names')}
                      name="clinicalStudyNames"
                      placeholder={i18n.t('placeholder-optional')}
                    />

                    <GenericTextField
                      formikProps={formikProps}
                      label={i18n.t('your-study.contact-name')}
                      name="clinicalStudyContacts"
                      placeholder={i18n.t('placeholder-optional')}
                    />
                    <GenericTextField
                      formikProps={formikProps}
                      label={i18n.t('your-study.uni-hospital')}
                      name="clinicalStudyInstitutions"
                      placeholder={i18n.t('placeholder-optional')}
                    />

                    <GenericTextField
                      formikProps={formikProps}
                      label={i18n.t('your-study.nct-number')}
                      name="clinicalStudyNctIds"
                      placeholder={i18n.t('placeholder-optional')}
                    />
                  </>
                ) : null}

                <View style={{ flex: 1 }} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <BrandedButton onPress={formikProps.handleSubmit}>
                  {this.props.route.params?.editing ? i18n.t('edit-profile.done') : i18n.t('next-question')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

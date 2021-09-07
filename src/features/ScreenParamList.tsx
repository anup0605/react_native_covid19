import { TAssessmentData } from '@covid/core/assessment/AssessmentCoordinator';
import { TPatientData } from '@covid/core/patient/PatientData';
import { ISchoolModel, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

export enum EConsentType {
  Adult = 'adult',
  Child = 'child',
}

export type TScreenParamList = {
  Splash: undefined;

  // Welcome screens
  Welcome: undefined;
  Welcome2: undefined;
  WelcomeRepeat: undefined;

  // Terms & consent screens
  Consent: { viewOnly: boolean };
  PrivacyPolicyUK: { viewOnly: boolean };
  BeforeWeStartUS: undefined;
  NursesConsentUS: { viewOnly: boolean };
  TermsOfUseUS: { viewOnly: boolean };
  PrivacyPolicyUS: { viewOnly: boolean };
  PrivacyPolicySV: { viewOnly: boolean };

  // User profile screens
  ResetPassword: undefined;
  ResetPasswordConfirm: undefined;
  Register: undefined;
  Login: { terms: string };
  CountrySelect: { onComplete?: VoidFunction };
  OptionalInfo: undefined;

  // Profile screens
  SelectProfile: { assessmentFlow: boolean };
  CreateProfile: { avatarName: string };
  AdultOrChild: { profileName: string; avatarName?: string };
  ConsentForOther: { profileName: string; avatarName?: string; consentType: EConsentType };
  ArchiveReason: { patientId: string };

  EditProfile: { patientData: TPatientData };
  EditLocation: { patientData: TPatientData };

  // Patient screens
  YourStudy: { patientData: TPatientData; editing: boolean };
  YourWork: { patientData: TPatientData };
  AboutYou: { patientData: TPatientData; editing: boolean };
  YourHealth: { patientData: TPatientData };
  PreviousExposure: { patientData: TPatientData };

  // Assessment screens
  HealthWorkerExposure: { assessmentData: TAssessmentData };
  CovidTestList: {
    assessmentData: TAssessmentData;
    tests?: TCovidTest[];
    mechanism?: ECovidTestMechanismOptions;
    is_rapid_test?: boolean;
  };
  CovidTestDetail: { assessmentData: TAssessmentData; test?: TCovidTest };
  CovidTestConfirm: { assessmentData: TAssessmentData; test: TCovidTest };
  HowYouFeel: { assessmentData: TAssessmentData };
  WhereAreYou: { assessmentData: TAssessmentData };
  TreatmentSelection: { assessmentData: TAssessmentData; location: string };
  TreatmentOther: { assessmentData: TAssessmentData; location: string };
  ProfileBackDate: { assessmentData: TAssessmentData };
  GeneralSymptoms: { assessmentData: TAssessmentData };
  HeadSymptoms: { assessmentData: TAssessmentData };
  ThroatChestSymptoms: { assessmentData: TAssessmentData };
  GutStomachSymptoms: { assessmentData: TAssessmentData };
  OtherSymptoms: { assessmentData: TAssessmentData };

  // Pingdemic
  Pingdemic: { assessmentData: TAssessmentData };

  // Vaccines
  AboutYourVaccineFeatureToggle: { assessmentData: TAssessmentData; editIndex?: number };
  AboutYourVaccineOld: { assessmentData: TAssessmentData; editIndex?: number };
  AboutYourVaccineUpdated: { assessmentData: TAssessmentData; editIndex?: number };
  VaccineDoseSymptoms: { assessmentData: TAssessmentData; dose: string };
  VaccineFindInfo: { assessmentData: TAssessmentData };
  VaccineListFeatureToggle: { assessmentData: TAssessmentData };
  VaccineList: { assessmentData: TAssessmentData };
  VaccineListOld: { assessmentData: TAssessmentData };
  VaccineListUpdated: { assessmentData: TAssessmentData };
  VaccineLogSymptomsInfo: { assessmentData: TAssessmentData };

  // Completion screens
  ThankYouSE: undefined;
  ThankYouUK: undefined;
  ThankYouUS: undefined;

  Dashboard: undefined;
  DashboardUS: undefined;
  EstimatedCases: undefined;

  // School network
  SchoolIntro: undefined;
  SchoolHowTo: { patientData: TPatientData };
  SelectSchool: undefined;
  JoinSchool: { patientData: TPatientData; higherEducation: boolean };
  JoinSchoolGroup: { patientData: TPatientData; selectedSchool: ISchoolModel };
  SchoolSuccess: undefined;
  SchoolGroupList: { patientData: TPatientData; selectedSchool: ISchoolModel };
  SchoolDashboard: { school: ISubscribedSchoolStats };
  ConfirmSchool: { patientData: TPatientData; school: ISchoolModel };
  JoinHigherEducation: { patientData: TPatientData };

  // Diet study
  DietStudy: undefined;
  DietStudyGlobal: undefined;
  DietStudyGut: undefined;
  DietStudyTraditional: undefined;

  // Mental health playback
  MentalHealthPlaybackGeneral: undefined;
  MentalHealthPlaybackIntroduction: undefined;
  MentalHealthPlaybackRating: undefined;
  MentalHealthPlaybackThankYou: undefined;

  // Mental health study
  MentalHealthChanges: undefined;
  MentalHealthFrequency: undefined;
  MentalHealthHistory: undefined;
  MentalHealthSupport: undefined;
  MentalHealthLearning: undefined;
  MentalHealthEnd: undefined;

  // Reconsent
  ReconsentIntroduction: undefined;
  ReconsentDiseasePreferences: undefined;
  ReconsentDiseaseSummary: undefined;
  ReconsentRequestConsent: undefined;
  ReconsentFeedback: undefined;
  ReconsentReconsider: undefined;
  ReconsentNewsletterSignup: undefined;

  // Others
  Modal: undefined;
  Main: undefined;
  Share: undefined;
  VaccineListMissingModal: { vaccine: TVaccineRequest };
  VersionUpdateModal: undefined;

  Trendline: { lad?: string };

  Anniversary: undefined;

  LongCovidStart: { patientData: TPatientData };
  LongCovidQuestion: { patientData: TPatientData };
};

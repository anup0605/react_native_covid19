import { TProfile } from '@covid/core/profile/ProfileService';

export type TPatientStateType = {
  patientId: string;
  profile: TProfile;
  isHealthWorker: boolean;
  hasCompletedPatientDetails: boolean;
  hasBloodPressureAnswer: boolean;
  isFemale: boolean;
  isPeriodCapable: boolean;
  isReportedByAnother: boolean;
  isSameHousehold: boolean;
  shouldAskStudy: boolean;
  hasRaceEthnicityAnswer: boolean;
  hasAtopyAnswers: boolean;
  hasDiabetes: boolean;
  hasDiabetesAnswers: boolean;
  shouldAskExtendedDiabetes: boolean;
  hasHayfever: boolean;
  shouldShowUSStudyInvite: boolean;
  hasBloodGroupAnswer: boolean;
  hasSchoolGroup: boolean;
  isMinor: boolean;
  isChild: boolean;
  shouldShowVaccineList: boolean;
};

const initPatientState: TPatientStateType = {
  hasAtopyAnswers: true,
  hasBloodGroupAnswer: true,
  hasBloodPressureAnswer: true,
  hasCompletedPatientDetails: true,
  hasDiabetes: false,
  hasDiabetesAnswers: true,
  hasHayfever: false,
  hasRaceEthnicityAnswer: true,
  hasSchoolGroup: false,
  isChild: false,
  isFemale: false,
  isHealthWorker: false,
  isMinor: false,
  isPeriodCapable: false,
  isReportedByAnother: false,
  isSameHousehold: false,
  patientId: '',
  profile: {
    avatar_name: 'profile1',
    id: '',
    name: 'Bob',
    reported_by_another: false,
  },
  shouldAskExtendedDiabetes: false,
  shouldAskStudy: false,
  shouldShowUSStudyInvite: false,
  shouldShowVaccineList: false,
};

export const getInitialPatientState = (patientId: string): TPatientStateType => {
  return {
    ...initPatientState,
    patientId,
  } as TPatientStateType;
};

export const isMinorAge = (yearOfBirth: number): boolean => {
  const age = new Date().getFullYear() - yearOfBirth;
  return age >= 0 && age < 20;
};

export const isChildAge = (yearOfBirth: number): boolean => {
  return yearOfBirth >= new Date().getFullYear() - 18;
};

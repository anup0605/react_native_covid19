export type TCovidTest = {
  id: string;
  version: string;
  patient: string;
  type: ECovidTestType;

  result: string;
  mechanism: string;

  invited_to_test: boolean;
  trained_worker: string;
  test_performed_by: string;
  antibody_type_check: string;
  location: string;
  location_other: string;
  date_taken_specific: string;
  date_taken_between_start: string;
  date_taken_between_end: string;
  days_in_fridge: number | null;
  time_of_test: string;
  is_rapid_test: boolean;
};

export enum ECovidTestType {
  Generic = 'generic',
  NHSStudy = 'nhs_study',
}

export type TCovidTestResponse = {
  id: string;
};

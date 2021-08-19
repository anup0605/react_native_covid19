export interface IDbConfig {
  [x: string]: { path: string; defaultData?: unknown };
}

export interface IPatient {
  id: string;
  last_reported_at: string;
}

export interface IAssessment {
  id: string;
  patient: string;
  profile_attributes_updated_at: string;
}

export interface IDietStudy {
  id: string;
  patient: string;
}

export interface ICovidTest {
  id: string;
  patient: string;
}

export interface IConsent {
  id: string;
}

export interface IStudyConsent {
  id: string;
}

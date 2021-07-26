import config from './config';
import helpers from './helpers';
import { IAssessment, IConsent, ICovidTest, IDietStudy, IPatient, IStudyConsent } from './types';

const dbPath = './mock-server/db';

export default () => {
  const { bootstrap, get, save } = helpers(dbPath);
  const { patients, assessments, covidTests, dietStudies, consents, studyConsents } = config;

  bootstrap(config);

  return {
    assessments: {
      get: (assessmentId?: string) => get<IAssessment>(assessments.path)(assessmentId),
      save: (assessmentId: string, assessment: IAssessment): IAssessment =>
        save<IAssessment>(assessments.path)(assessmentId, assessment),
    },
    consents: {
      get: (testId?: string) => get<IConsent>(consents.path)(testId),
      save: (testId: string, consent: IConsent): IConsent => save<IConsent>(consents.path)(testId, consent),
    },
    covidTests: {
      get: (testId?: string) => get<ICovidTest>(covidTests.path)(testId),
      save: (testId: string, test: ICovidTest): ICovidTest => save<ICovidTest>(covidTests.path)(testId, test),
    },
    dietStudies: {
      get: (id?: string) => get<IDietStudy>(dietStudies.path)(id),
      save: (id: string, dietStudy: IDietStudy): IDietStudy => save<IDietStudy>(dietStudies.path)(id, dietStudy),
    },
    patients: {
      get: (patientId?: string) => get<IPatient>(patients.path)(patientId),
      save: (patientId: string, patient: IPatient) => save<IPatient>(patients.path)(patientId, patient),
    },
    studyConsents: {
      get: (testId?: string) => get<IStudyConsent>(studyConsents.path)(testId),
      save: (testId: string, studyConsent: IStudyConsent): IStudyConsent =>
        save<IStudyConsent>(studyConsents.path)(testId, studyConsent),
    },
  };
};

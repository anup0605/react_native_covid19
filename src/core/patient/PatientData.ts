import { PatientStateType } from '@covid/core/patient/PatientState';
import { TProfile } from '@covid/core/profile/ProfileService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export type PatientData = {
  patientId: string;
  patientState: PatientStateType;
  patientInfo?: PatientInfosRequest;
  profile?: TProfile;
};

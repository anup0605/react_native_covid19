import { TPatientStateType } from '@covid/core/patient/PatientState';
import { TProfile } from '@covid/core/profile/ProfileService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export type TPatientData = {
  patientId: string;
  patientState: TPatientStateType;
  patientInfo?: TPatientInfosRequest;
  profile?: TProfile;
};

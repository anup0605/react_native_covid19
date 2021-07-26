import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

export enum EActionTypes {
  ASSESSMENT_UPDATED = 'ASSESSMENT_UPDATED',
  ASSESSMENT_CLEARED = 'ASSESSMENT_CLEARED',
}

export type TActionType = {
  type: EActionTypes;
};

export type TPayloadActionType = TActionType & {
  payload: Partial<TAssessmentInfosRequest>;
};

export type TAssessmentActions = TActionType | TPayloadActionType;

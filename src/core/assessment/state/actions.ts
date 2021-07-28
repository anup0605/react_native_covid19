import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

import { EActionTypes, TActionType, TPayloadActionType } from './types';

export const updateAssessment = (assessment: Partial<TAssessmentInfosRequest>): TPayloadActionType => {
  return {
    payload: assessment,
    type: EActionTypes.ASSESSMENT_UPDATED,
  };
};

export const clearAssessment = (): TActionType => {
  return {
    type: EActionTypes.ASSESSMENT_CLEARED,
  };
};

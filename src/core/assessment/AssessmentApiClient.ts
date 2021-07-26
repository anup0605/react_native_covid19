import appConfig from '@covid/appConfig';
import ApiClient from '@covid/core/api/ApiClient';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { TAssessmentResponse } from '@covid/core/assessment/dto/AssessmentInfosResponse';

export interface IAssessmentRemoteClient {
  addAssessment(assessment: TAssessmentInfosRequest): Promise<TAssessmentResponse>;
  updateAssessment(assessmentId: string, assessment: TAssessmentInfosRequest): Promise<TAssessmentResponse>;
}

const apiClient = new ApiClient();

export class AssessmentApiClient implements IAssessmentRemoteClient {
  addAssessment(assessment: TAssessmentInfosRequest): Promise<TAssessmentResponse> {
    assessment = {
      ...assessment,
      version: appConfig.assessmentVersion,
    };
    return apiClient.post<TAssessmentInfosRequest, TAssessmentResponse>('/assessments/', assessment);
  }

  updateAssessment(assessmentId: string, assessment: TAssessmentInfosRequest): Promise<TAssessmentResponse> {
    const assessmentUrl = `/assessments/${assessmentId}/`;
    return apiClient.patch<TAssessmentInfosRequest, TAssessmentResponse>(assessmentUrl, assessment);
  }
}

export const assessmentApiClient = new AssessmentApiClient();

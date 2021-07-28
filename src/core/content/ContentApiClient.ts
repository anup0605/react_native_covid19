import ApiClient from '@covid/core/api/ApiClient';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';

import { TFeaturedContentResponse, TTrendLineResponse } from './dto/ContentAPIContracts';

export interface IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo>;
  getTrendLines(lad?: string): Promise<TTrendLineResponse>;
  getFeaturedContent(): Promise<TFeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void>;
}

const apiClient = new ApiClient();

export class ContentApiClient implements IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo> {
    return apiClient.get<TStartupInfo>('/users/startup_info/');
  }

  getTrendLines(lad?: string): Promise<TTrendLineResponse> {
    const path = lad ? `/trendlines/?lad=${lad}` : `/trendlines/`;
    return apiClient.get<TTrendLineResponse>(path);
  }

  getFeaturedContent(): Promise<TFeaturedContentResponse> {
    return apiClient.get<TFeaturedContentResponse>('/content/');
  }

  signUpForDietNewsletter(signup: boolean): Promise<void> {
    const infos = {
      nutrition_newsletter: signup,
    };
    return apiClient.patch(`/users/email_preference/`, infos);
  }

  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void> {
    const infos = {
      disease_research_newsletter: signup,
    };
    return apiClient.patch(`/users/email_preference/`, infos);
  }
}

export const contentApiClient = new ContentApiClient();

import ApiClient from '@covid/core/api/ApiClient';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';

import { TFeaturedContentResponse, TTrendLineResponse } from './dto/ContentAPIContracts';

interface IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo>;
  getTrendLines(): Promise<TTrendLineResponse>;
  getFeaturedContent(): Promise<TFeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void>;
}

const apiClient = new ApiClient();

class ContentApiClient implements IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo> {
    return apiClient.get<TStartupInfo>('/users/startup_info/');
  }

  getTrendLines(): Promise<TTrendLineResponse> {
    return apiClient.get<TTrendLineResponse>('/trendlines/');
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

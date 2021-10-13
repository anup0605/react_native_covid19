import ApiClient from '@covid/core/api/ApiClient';

const apiClient = new ApiClient();

type TUserEvent = 'view-mental-health-insights' | 'skip-mental-health-insights' | 'feedback_reconsent';

export default class GeneralApiClient {
  postUserEvent(event: TUserEvent, context?: object) {
    return apiClient.post('/user_events/', { context, event });
  }
}

import ApiClient from '@covid/core/api/ApiClient';
import { TTokenInfoRequest, TTokenInfoResponse } from '@covid/core/user/dto/UserAPIContracts';

import { IPushTokenRemoteClient, TPushToken } from './types';

const apiClient = new ApiClient();

export default class PushNotificationApiClient implements IPushTokenRemoteClient {
  updatePushToken(pushToken: TPushToken): Promise<TTokenInfoResponse> {
    const tokenDoc = {
      ...pushToken,
      active: true,
    } as TTokenInfoRequest;
    return apiClient.post<TTokenInfoRequest, TTokenInfoResponse>(`/tokens/`, tokenDoc);
  }
}

export const pushNotificationApiClient = new PushNotificationApiClient();

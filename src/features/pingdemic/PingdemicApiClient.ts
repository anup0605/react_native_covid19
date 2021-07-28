import ApiClient from '@covid/core/api/ApiClient';

import { TPingdemicRequest } from './PingdemicRequest';

const PATH = '/pingdemic/';

export interface IPingdemicApiClient {
  add(pingdemicRequestData: TPingdemicRequest): Promise<TPingdemicRequest>;
}
const apiClient = new ApiClient();

export class PingdemicApiClient implements IPingdemicApiClient {
  add(pingdemicRequestData: TPingdemicRequest) {
    return apiClient.post<TPingdemicRequest, TPingdemicRequest>(PATH, pingdemicRequestData);
  }
}

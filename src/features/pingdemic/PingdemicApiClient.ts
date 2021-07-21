import ApiClient from '@covid/core/api/ApiClient';

import { PingdemicRequest } from './PingdemicRequest';

const PATH = '/pingdemic/';

export interface IPingdemicApiClient {
  add(pingdemicRequestData: PingdemicRequest): Promise<PingdemicRequest>;
}
const apiClient = new ApiClient();

export class PingdemicApiClient implements IPingdemicApiClient {
  add(pingdemicRequestData: PingdemicRequest) {
    return apiClient.post<PingdemicRequest, PingdemicRequest>(PATH, pingdemicRequestData);
  }
}

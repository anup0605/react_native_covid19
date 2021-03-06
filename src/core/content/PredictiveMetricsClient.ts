import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import Axios from 'axios';

interface IPredictiveMetricsClient {
  getDailyCases(): Promise<string>;
  getActiveCases(): Promise<string>;
}

type TIncidenceResponse = {
  uk_incidence: string;
};

type TPrevalenceResponse = {
  uk_prevalence: string;
};

class PredictiveMetricsClient implements IPredictiveMetricsClient {
  apiClient: IApiClient;

  constructor() {
    this.apiClient = new ApiClient();

    const client = Axios.create({
      baseURL: 'https://covid-assets.joinzoe.com',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      timeout: 5 * 1000,
    });

    this.apiClient.setClient(client);
  }

  async getDailyCases(): Promise<string> {
    const response = await this.apiClient.get<TIncidenceResponse>('/latest/incidence.json');
    return response.uk_incidence;
  }

  async getActiveCases(): Promise<string> {
    const response = await this.apiClient.get<TPrevalenceResponse>('/latest/prevalence.json');
    return response.uk_prevalence;
  }
}

export const predictiveMetricsClient = new PredictiveMetricsClient();

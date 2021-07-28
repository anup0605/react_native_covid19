import appConfig from '@covid/appConfig';
import { AxiosResponse } from 'axios';

import { TCovidTest, TCovidTestResponse } from './dto/CovidTestContracts';
import UserService, { IUserService } from './UserService';

export interface ICovidTestService extends IUserService {
  listTests(): Promise<AxiosResponse<TCovidTest[]>>;
  addTest(test: Partial<TCovidTest>): Promise<AxiosResponse<TCovidTestResponse>>;
  getTest(testId: string): Promise<TCovidTest>;
  updateTest(testId: string, test: Partial<TCovidTest>): Promise<AxiosResponse<TCovidTestResponse>>;
  deleteTest(testId: string): Promise<AxiosResponse<TCovidTestResponse>>;
}

export default class CovidTestService extends UserService implements ICovidTestService {
  public async listTests() {
    return this.client.get<TCovidTest[]>(`/covid_tests/`);
  }

  public async addTest(test: Partial<TCovidTest>) {
    test = {
      ...test,
      version: appConfig.covidTestVersion,
    };
    return this.client.post<TCovidTestResponse>(`/covid_tests/`, test);
  }

  public async getTest(testId: string): Promise<TCovidTest> {
    const response = await this.client.get<TCovidTest>(`/covid_tests/${testId}/`);
    return response.data;
  }

  public async updateTest(testId: string, test: Partial<TCovidTest>) {
    return this.client.patch<TCovidTestResponse>(`/covid_tests/${testId}/`, test);
  }

  public async deleteTest(testId: string) {
    return this.client.patch<TCovidTestResponse>(`/covid_tests/${testId}/`, { deleted: true });
  }
}

export const covidTestService = new CovidTestService();

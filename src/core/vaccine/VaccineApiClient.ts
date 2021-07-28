import appConfig from '@covid/appConfig';
import ApiClient from '@covid/core/api/ApiClient';
import { TDoseSymptomsRequest, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { TDoseSymptomsResponse, TVaccineResponse } from '@covid/core/vaccine/dto/VaccineResponse';

export interface IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<TVaccineResponse>;
  updateVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<TVaccineResponse>;
  saveDoseSymptoms(patientId: string, payload: Partial<TDoseSymptomsRequest>): Promise<TDoseSymptomsResponse>;
  listVaccines(): Promise<TVaccineRequest[]>;
  deleteVaccine(vaccineId: string): Promise<void>;
}

const apiClient = new ApiClient();

export class VaccineApiClient implements IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<TVaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return apiClient.post<TVaccineRequest, TVaccineResponse>('/vaccines/', payload as TVaccineRequest);
  }

  updateVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<TVaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return apiClient.patch<TVaccineRequest, TVaccineResponse>(`/vaccines/${payload.id}/`, payload as TVaccineRequest);
  }

  saveDoseSymptoms(patientId: string, payload: Partial<TDoseSymptomsRequest>): Promise<TDoseSymptomsResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return apiClient.post<TDoseSymptomsRequest, TDoseSymptomsResponse>(
      '/dose_symptoms/',
      payload as TDoseSymptomsRequest,
    );
  }

  listVaccines(): Promise<TVaccineRequest[]> {
    return apiClient.get<TVaccineRequest[]>(`/vaccines/`);
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    return apiClient.delete<object, void>(`/vaccines/${vaccineId}/`, {}); // TODO CHECK THIS
  }
}

export const vaccineApiClient = new VaccineApiClient();

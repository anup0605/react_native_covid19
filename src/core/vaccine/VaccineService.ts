import { TDose, TDoseSymptomsRequest, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';

export interface IVaccineService {
  saveVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<boolean>;
  saveDoseSymptoms(patientId: string, payload: Partial<TDoseSymptomsRequest>): Promise<boolean>;
  deleteVaccine(vaccineId: string): Promise<void>;
  listVaccines(): Promise<TVaccineRequest[]>;
}

export class VaccineService implements IVaccineService {
  initDoses(): Partial<TDose>[] {
    return [
      {
        sequence: 1,
      },
      {
        sequence: 2,
      },
    ];
  }

  public async saveVaccineResponse(patientId: string, payload: Partial<TVaccineRequest>): Promise<boolean> {
    if (!payload.doses) payload.doses = this.initDoses();
    if (payload.id) {
      await vaccineApiClient.updateVaccineResponse(patientId, payload);
    } else {
      await vaccineApiClient.saveVaccineResponse(patientId, payload);
    }
    return true;
  }

  public async saveDoseSymptoms(patientId: string, payload: Partial<TDoseSymptomsRequest>): Promise<boolean> {
    await vaccineApiClient.saveDoseSymptoms(patientId, payload);
    return true;
  }

  listVaccines(): Promise<TVaccineRequest[]> {
    return vaccineApiClient.listVaccines();
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    return vaccineApiClient.deleteVaccine(vaccineId);
  }
}

export const vaccineService = new VaccineService();

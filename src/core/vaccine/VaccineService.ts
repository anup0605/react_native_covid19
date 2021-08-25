import { TDose, TDoseSymptomsRequest, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';

export interface IVaccineService {
  saveVaccineAndDoses(patientId: string, payload: Partial<TVaccineRequest>): Promise<boolean>;
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

  public async saveVaccineAndDoses(patientId: string, payload: Partial<TVaccineRequest>): Promise<boolean> {
    if (!payload.doses) payload.doses = this.initDoses();
    if (payload.id) {
      await vaccineApiClient.updateVaccineAndDoses(patientId, payload);
    } else {
      await vaccineApiClient.saveVaccineAndDoses(patientId, payload);
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

  // Deprecated as the "new" Vaccine system treats vaccine as a "Vaccination Record", and uses PATCH to "delete" doses
  deleteVaccine(vaccineId: string): Promise<void> {
    return vaccineApiClient.deleteVaccine(vaccineId);
  }
}

export const vaccineService = new VaccineService();

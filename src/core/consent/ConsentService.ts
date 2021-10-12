import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { TConsent } from '@covid/core/user/dto/UserAPIContracts';

type TConsentDocument = 'US' | 'UK' | 'SE' | '' | 'US Nurses' | 'Health Study Consent';

interface IConsentService {
  postConsent(document: TConsentDocument, version: string, privacy_policy_version: string): void;
  getConsentSigned(): Promise<TConsent | null>;
  setConsentSigned(document: TConsentDocument, version: string, privacy_policy_version: string): void;
}

export class ConsentService extends ApiClientBase implements IConsentService {
  client = ApiClientBase.client;

  static consentSigned: TConsent = {
    document: '',
    privacy_policy_version: '',
    version: '',
  };

  async postConsent(document: TConsentDocument, version: string, privacy_policy_version: string) {
    const payload = {
      document,
      privacy_policy_version,
      version,
    };
    return this.client.post('/consent/', payload);
  }

  async getConsentSigned(): Promise<TConsent | null> {
    const consent: string | null = await AsyncStorageService.getConsentSigned();
    return consent ? JSON.parse(consent) : null;
  }

  async setConsentSigned(document: TConsentDocument, version: string, privacy_policy_version: string) {
    const consent = {
      document,
      privacy_policy_version,
      version,
    };
    ConsentService.consentSigned = consent;
    await AsyncStorageService.setConsentSigned(JSON.stringify(consent));
  }

  async revokeConsentWiderHealthStudies() {
    return this.client.post('/revoke_wider_health_studies_consent/');
  }
}

export const consentService = new ConsentService();

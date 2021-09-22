import DefaultConfig from './config/default.json';
import GBConfig from './config/GB.json';
import SEConfig from './config/SE.json';
import USConfig from './config/US.json';

export type TConfigType = {
  country: string;
  enableMultiplePatients: boolean;
  enablePersonalInformation: boolean;
  enableCohorts: boolean;

  showEthnicityQuestion: boolean;
  showRaceQuestion: boolean;
  showPregnancyQuestion: boolean;

  defaultHeightUnit: string;
  defaultWeightUnit: string;
  defaultTemperatureUnit: string;
  thousandSeparator: string;
};

const configs = new Map<string, TConfigType>([
  ['GB', { ...DefaultConfig, ...GBConfig } as TConfigType],
  ['SE', { ...DefaultConfig, ...SEConfig } as TConfigType],
  ['US', { ...DefaultConfig, ...USConfig } as TConfigType],
]);

const defaultCountryCode = 'GB';
let config = configs.get(defaultCountryCode);

export const getCountryConfig = (countryCode: string): TConfigType => {
  return configs.get(countryCode) ?? (DefaultConfig as TConfigType);
};

export const setConfigCountry = (country: string) => {
  if (country && configs.has(country)) {
    config = configs.get(country);
  }
};

export const getConfig = () => {
  return config;
};

import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';

const PCR_LATERAL_FLOW_MECHANISMS = [
  ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB,
  ECovidTestMechanismOptions.SPIT_TUBE,
  ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB_AND_SALIVA,
  ECovidTestMechanismOptions.NOSE_SWAB,
  ECovidTestMechanismOptions.THROAT_SWAB,
];

const ANTIBODY_MECHANISMS = [
  ECovidTestMechanismOptions.BLOOD_SAMPLE,
  ECovidTestMechanismOptions.BLOOD_FINGER_PRICK,
  ECovidTestMechanismOptions.BLOOD_NEEDLE_DRAW,
];

const ALL_MECHANISMS_EXCEPT_OTHER = PCR_LATERAL_FLOW_MECHANISMS.concat(ANTIBODY_MECHANISMS);

const ZOE_INVITE_MECHANISMS = [ECovidTestMechanismOptions.BLOOD_FINGER_PRICK, ECovidTestMechanismOptions.PCR];

export function isPcrTest(mechanism: ECovidTestMechanismOptions, isRapidTest: boolean) {
  return PCR_LATERAL_FLOW_MECHANISMS.includes(mechanism) && !isRapidTest;
}

export function isLateralFlowTest(mechanism: ECovidTestMechanismOptions, isRapidTest: boolean) {
  return PCR_LATERAL_FLOW_MECHANISMS.includes(mechanism) && isRapidTest;
}

export function isAntibodyTest(mechanism: ECovidTestMechanismOptions) {
  return ANTIBODY_MECHANISMS.includes(mechanism);
}

export function isOtherTest(mechanism: ECovidTestMechanismOptions) {
  return !ALL_MECHANISMS_EXCEPT_OTHER.includes(mechanism);
}

export function isZoeInviteOfferTest(mechanism: ECovidTestMechanismOptions) {
  return ZOE_INVITE_MECHANISMS.includes(mechanism);
}

export function getTestType(mechanism: ECovidTestMechanismOptions, isRapidTest: boolean) {
  if (isPcrTest(mechanism, isRapidTest)) {
    return 'PCR';
  }
  if (isLateralFlowTest(mechanism, isRapidTest)) {
    return 'Lateral';
  }
  if (isAntibodyTest(mechanism)) {
    return 'Antibody';
  }
  if (isOtherTest(mechanism)) {
    return 'Other';
  }
  return null;
}

import { device, init } from 'detox';

import { testCreateNewProfileFeature } from './testCreateNewProfileFeature';
import { testLoginScreen } from './testLoginScreen';
import { testLogoutFeature } from './testLogoutFeature';
import { testReconsentFeature } from './testReconsentFeature';
import { testRegisterFeature } from './testRegisterFeature';
import { testReportTodayFeature } from './testReportTodayFeature';
import { testSelectCountryScreen } from './testSelectCountryScreen';
import { testWelcomeScreen } from './testWelcomeScreen';

jest.setTimeout(60000);

const defaultPassword = 'manymuffins';
const defaultEmailAddress = 'test@joinzoe.com';
const profileName = `profile ${Math.round(Date.now() / 1000)}`;

beforeAll(async () => {
  await device.launchApp({ newInstance: true, permissions: { notifications: 'YES' } });
});

beforeEach(async () => {
  if (typeof device === 'undefined') {
    await init();
  }
});

const timestamp = Math.round(Date.now() / 1000);
const tempEmailAddress = `test-${timestamp}@joinzoe.com`;
const tempPhoneNumber = `+44 7900 ${timestamp}`;

testWelcomeScreen();
testSelectCountryScreen({
  endWithCountry: 'GB',
  testAllCountries: false,
});
testRegisterFeature({
  emailAddress: tempEmailAddress,
  password: defaultPassword,
  phoneNumber: tempPhoneNumber,
});
testReconsentFeature({
  consent: false,
  fillInAllFeedback: false,
  fillInFeedback: ['im_only_interested_in_fighting_covid_19_right_now', 'other'],
  privacyPolicyScrollDown: false,
  privacyPolicyView: true,
  reconsider: true,
  selectAllDiseases: true,
  selectDiseases: [
    'research_consent_dementia',
    'research_consent_nutrition_and_gut_health',
    'research_consent_womens_health',
    'research_consent_autoimmune_conditions',
  ],
});
testLogoutFeature();
testLoginScreen({
  emailAddress: defaultEmailAddress,
  password: defaultPassword,
});
testCreateNewProfileFeature({
  profileName,
});
testReportTodayFeature({
  addTest: false,
  addVaccine: false,
  healthy: false,
});
testReportTodayFeature({
  addTest: true,
  addVaccine: true,
  healthy: true,
});
testLogoutFeature();
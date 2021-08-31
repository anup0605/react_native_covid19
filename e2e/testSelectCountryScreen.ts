/* eslint-env jest */

import { by, element, expect } from 'detox';

type TCountry = 'GB' | 'SE' | 'US';

const countries: TCountry[] = ['GB', 'SE', 'US'];

type TSelectCountryConfig = {
  endWithCountry: TCountry;
  testAllCountries: boolean;
};

export function testSelectCountryScreen(config: TSelectCountryConfig) {
  describe('Test the select country screen', () => {
    it('should open the select country screen', async () => {
      await expect(element(by.id('select-country'))).toBeVisible();
      await element(by.id('select-country')).tap();
    });

    it('should show all the select country buttons', async () => {
      for (const country of countries) {
        // eslint-disable-next-line no-await-in-loop
        await expect(element(by.id(`select-country-${country}`))).toBeVisible();
      }
    });

    it('should go to the login screen after clicking the back button', async () => {
      await element(by.id('button-back-navigation')).tap();
      await expect(element(by.id('select-country'))).toExist();
    });

    if (config.testAllCountries) {
      countries.forEach((country) => {
        if (config.endWithCountry === country) {
          return;
        }
        it(`should change the country to ${country}`, async () => {
          await element(by.id('select-country')).tap();
          await element(by.id(`select-country-${country}`)).tap();
          await expect(element(by.id(`flag-${country}`))).toBeVisible();
        });
      });
    }
    if (config.endWithCountry) {
      it(`should change the country to ${config.endWithCountry}`, async () => {
        await element(by.id('select-country')).tap();
        await element(by.id(`select-country-${config.endWithCountry}`)).tap();
        await expect(element(by.id(`flag-${config.endWithCountry}`))).toBeVisible();
      });
    }
  });
}

/* eslint-env jest */
/* eslint-disable no-await-in-loop */

import { extendedDiseases, initialDiseases } from '@covid/features/wider-health-studies/data/diseases';
import { by, element, expect } from 'detox';

import { scrollDownToId } from './helpers';

const legalCards = ['advance-science', 'improve-health', 'build-products'];

const diseases = [
  initialDiseases[0],
  initialDiseases[initialDiseases.length - 1],
  extendedDiseases[0],
  extendedDiseases[extendedDiseases.length - 2],
];

export function testWiderHealthStudies() {
  describe('Test the wider health studies feature', () => {
    it('should open the drawer/menu', async () => {
      await element(by.id('drawer-toggle')).tap();
    });
    it('should open the wider health studies screen', async () => {
      await element(by.id('menu-item-wider-health-studies')).tap();
    });
    // Test the disease preferences screen
    it('should be possible to edit the disease preferences', async () => {
      await element(by.id('button-preferences-card')).tap();
      for (const disease of diseases) {
        await scrollDownToId('scroll-view-disease-preferences-screen', `disease-card-${disease.name}`);
        await element(by.id(`disease-card-${disease.name}`)).tap();
      }
      await scrollDownToId('scroll-view-disease-preferences-screen', 'button-cta-disease-preferences-submit');
      await element(by.id('button-cta-disease-preferences-submit')).tap();
    });

    // Test the legal screen
    it('should be possible to view the legal data screen', async () => {
      await element(by.id('data-card')).tap();
      for (const legalCard of legalCards) {
        await expect(element(by.id(`${legalCard}-legal-card`))).toExist();
      }
    });

    // Test the privacy notice screen
    // privacy-notice-link

    // Test opt out
    // opt-out-button

    // Test opt in
  });
}

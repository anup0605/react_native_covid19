import { by, element } from 'detox';

import { scrollDownToId, tapInputById } from './helpers';

export function testAboutYouForm() {
  it('should be able to fill in the form about you', async () => {
    await element(by.id('input-year-of-birth')).typeText('2000');

    await tapInputById('input-sex-at-birth-item-pfnts');

    await scrollDownToId('scroll-view-about-you-screen', 'input-gender-identity-item-pfnts');
    await tapInputById('input-gender-identity-item-pfnts');

    await scrollDownToId('scroll-view-about-you-screen', 'checkbox-race-ethnicity-prefer_not_to_say');
    await tapInputById('checkbox-race-ethnicity-prefer_not_to_say');

    await scrollDownToId('scroll-view-about-you-screen', 'input-height-feet');
    await element(by.id('input-height-feet')).typeText('6');
    await element(by.id('input-height-inches')).typeText('0');

    await scrollDownToId('scroll-view-about-you-screen', 'input-weight-kg');
    await element(by.id('input-weight-kg')).typeText('75');

    await scrollDownToId('scroll-view-about-you-screen', 'input-postal-code');
    await element(by.id('input-postal-code')).typeText('SW1A 1AA');

    await scrollDownToId('scroll-view-about-you-screen', 'input-ever-exposed-item-no');
    await tapInputById('input-ever-exposed-item-no');

    await scrollDownToId('scroll-view-about-you-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('about-you-screen'))).tap();
  });
}

export function testAboutYourWorkForm() {
  it('should be able to fill in the form about your work', async () => {
    await tapInputById('input-healthcare-staff-item-no');

    await element(by.id('button-no-is-carer-question')).tap();

    await scrollDownToId('scroll-view-your-work-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('your-work-screen'))).tap();
  });
}

export function testAboutYourHealthForm() {
  it('should be able to fill in the form about your health', async () => {
    await scrollDownToId('scroll-view-your-health-screen', 'input-blood-group-item-unsure');
    await element(by.id('input-blood-group-item-unsure')).tap();

    await scrollDownToId('scroll-view-your-health-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('your-health-screen'))).tap();
  });
}

export function testPreviousExposureForm() {
  it('should be able to fill in the form previous exposure', async () => {
    await scrollDownToId('scroll-view-previous-exposure-screen', 'button-submit');
    await element(by.id('button-submit').withAncestor(by.id('previous-exposure-screen'))).tap();
  });
}

export function testLongCovidForm() {
  it('should complete the long covid questionnaire (if present)', async () => {
    try {
      await element(by.id('button-footer').withAncestor(by.id('long-covid-start-screen'))).tap();

      await element(by.id('input-had-covid-item-NO')).tap();
      await element(by.id('button-submit').withAncestor(by.id('long-covid-question-screen'))).tap();
    } catch (_) {}
  });
}

export function testPingdemicForm() {
  it('should complete the anti-pingdemic form (if present)', async () => {
    try {
      await scrollDownToId('scroll-view-pingdemic-screen', 'input-radio-asked-by-app-item-pfnts');
      await element(by.id('input-radio-asked-by-app-item-pfnts')).tap();

      await scrollDownToId('scroll-view-pingdemic-screen', 'button-submit');
      await element(by.id('button-submit').withAncestor(by.id('pingdemic-screen'))).tap();
    } catch (_) {}
  });
}

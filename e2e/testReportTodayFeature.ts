import { by, element } from 'detox';

import { scrollDownToElement, scrollDownToId, scrollUpToElement } from './helpers';

type TReportTodayConfig = {
  addTest: boolean;
  addVaccine: boolean;
  healthy: boolean;
};

export function testReportTodayFeature(config: TReportTodayConfig) {
  describe(config.healthy ? 'Test report today as healthy' : 'Test report today as not healthy', () => {
    it('should open the select profile screen', async () => {
      await element(by.id('button-report-today')).tap();
    });

    it('should open the first profile', async () => {
      await element(by.id('profile-card-0')).tap();
    });

    function testAddTest() {
      it('should be able to add a COVID-19 test', async () => {
        await element(by.id('button-add-test')).tap();
        await element(by.id('button-yes-covid-test-date-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-mechanism-question');
        await element(by.id('covid-test-mechanism-question-item-spit_tube')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-location-question');
        await element(by.id('covid-test-location-question-item-home')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'covid-test-result-question');
        await element(by.id('covid-test-result-question-item-negative')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-no-covid-test-is-rapid-question');
        await element(by.id('button-no-covid-test-is-rapid-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-no-covid-test-invited-question');
        await element(by.id('button-no-covid-test-invited-question')).tap();

        await scrollDownToId('scroll-view-covid-test-detail-screen', 'button-submit');
        await element(by.id('button-submit').withAncestor(by.id('covid-test-detail-screen'))).tap();

        // The test can't be completed because the date input is not testable.
        await element(by.id('button-back-navigation').withAncestor(by.id('covid-test-detail-screen'))).tap();
      });
    }
    if (config.addTest) {
      testAddTest();
    }

    it('should open the vaccine list screen', async () => {
      await element(by.id('button-covid-test-list-screen')).tap();
    });

    // 0: Other / I don't know
    // 1: Johnson and Johnson, which has a single shot
    // 2: Pfizer / Moderna / AstraZeneca, which has two shots
    function testAddVaccine(type = 0, secondDose = false) {
      it(`should be able to add a COVID-19 vaccine of type ${type}`, async () => {
        await element(by.id('button-add-vaccine')).tap();

        let itemName = 'not_sure';
        if (type === 1) {
          itemName = 'johnson';
        } else if (type === 2) {
          itemName = 'pfizer';
        }

        await element(
          by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-first-dose-question')),
        ).tap();

        // @todo: Calendar input
        await element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-first-dose-question'))).tap();

        if (secondDose && (type === 0 || type === 2)) {
          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id('button-yes').withAncestor(by.id('scroll-view-about-your-vaccine-screen'))),
          );
          await element(by.id('button-yes').withAncestor(by.id('scroll-view-about-your-vaccine-screen'))).tap();

          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-second-dose-question'))),
          );
          await element(
            by.id(`input-your-vaccine-item-${itemName}`).withAncestor(by.id('vaccine-second-dose-question')),
          ).tap();

          // @todo: Calendar input
          await scrollDownToElement(
            'scroll-view-about-your-vaccine-screen',
            element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-second-dose-question'))),
          );
          await element(by.id('button-calendar-picker').withAncestor(by.id('vaccine-second-dose-question'))).tap();
        }

        await scrollDownToElement(
          'scroll-view-about-your-vaccine-screen',
          element(by.id('button-submit').withAncestor(by.id('about-your-vaccine-screen'))),
        );
        await element(by.id('button-submit').withAncestor(by.id('about-your-vaccine-screen'))).tap();

        // The test can't be completed because the date input is not testable.
        await element(by.id('button-back-navigation').withAncestor(by.id('about-your-vaccine-screen'))).tap();
      });
    }
    if (config.addVaccine) {
      testAddVaccine(0, false);
      testAddVaccine(0, true);
      testAddVaccine(1);
      testAddVaccine(2, false);
      testAddVaccine(2, true);
    }

    it('should open the healthy screen', async () => {
      await element(by.id('button-vaccine-list-screen')).tap();
    });

    if (config.healthy) {
      it('should set the health status to healthy', async () => {
        await element(by.id('button-status-healthy')).tap();
      });
    } else {
      it('should set the health status to not healthy', async () => {
        await element(by.id('button-status-not-healthy')).tap();
      });

      it('should accept the general symptoms form when empty', async () => {
        await element(by.id('scroll-view-general-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('general-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('head-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the general symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-general-symptoms-screen',
          element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-chills').withAncestor(by.id('general-symptoms-screen'))).tap();

        await element(by.id('scroll-view-general-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('general-symptoms-screen'))).tap();
      });

      it('should accept the head area symptoms form when empty', async () => {
        await element(by.id('scroll-view-head-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('head-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the head area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-head-symptoms-screen',
          element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-dizzy').withAncestor(by.id('head-symptoms-screen'))).tap();

        await element(by.id('scroll-view-head-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('head-symptoms-screen'))).tap();
      });

      it('should accept the throat/chest area symptoms form when empty', async () => {
        await element(by.id('scroll-view-throat-chest-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the throat/chest area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-throat-chest-symptoms-screen',
          element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-soreThroat').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();

        await element(by.id('scroll-view-throat-chest-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('throat-chest-symptoms-screen'))).tap();
      });

      it('should accept the gut/stomach area symptoms form when empty', async () => {
        await element(by.id('scroll-view-gut-stomach-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('other-symptoms-screen'))).tap();
      });

      it('should be possible to fill in the gut/stomach area symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-gut-stomach-symptoms-screen',
          element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))),
        );
        await element(by.id('checkbox-item-abdominalPain').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();

        await element(by.id('scroll-view-gut-stomach-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('gut-stomach-symptoms-screen'))).tap();
      });

      it('should accept the other symptoms form when empty', async () => {
        await element(by.id('scroll-view-other-symptoms-screen')).scrollTo('bottom');
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();

        await element(by.id('button-back-navigation').withAncestor(by.id('where-are-you-screen'))).tap();
      });

      it('should be possible to fill in the other symptoms form', async () => {
        await scrollUpToElement(
          'scroll-view-other-symptoms-screen',
          element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))),
        );
        await element(by.id('input-other-symptoms').withAncestor(by.id('other-symptoms-screen'))).typeText('Test');

        await element(by.id('scroll-view-other-symptoms-screen')).scrollTo('bottom');
        // Double tap to lose the focus from the text input above.
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();
        await element(by.id('button-submit').withAncestor(by.id('other-symptoms-screen'))).tap();
      });

      it('should be possible to select my location', async () => {
        await element(by.id('button-location-home').withAncestor(by.id('where-are-you-screen'))).tap();
      });
    }

    it('should dismiss the rating modal (if present)', async () => {
      try {
        await element(by.id('button-rating-yes')).tap();
        await element(by.id('button-rating-later')).tap();
      } catch (_) {}
    });

    it('should go to the dashboard screen', async () => {
      await scrollDownToId('scroll-view-thank-you-screen', 'button-complete');
      await element(by.id('button-complete')).tap();
    });
  });
}

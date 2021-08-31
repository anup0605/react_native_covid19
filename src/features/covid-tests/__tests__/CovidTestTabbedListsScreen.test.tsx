/* eslint-env jest */

import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import CovidTestTabbedListsScreen from '@covid/features/covid-tests/CovidTestTabbedListsScreen';
import * as React from 'react';
import { TabBarItem } from 'react-native-tab-view';
import renderer from 'react-test-renderer';

import MockedNavigator from '../../../../__mocks__/MockedNavigator';

function createComponent(covidTests: TCovidTest[], showTab: string) {
  const minTabViewHeight = 240;
  const tabViewHeight = 500;

  const element = (
    <MockedNavigator
      Component={() => (
        <CovidTestTabbedListsScreen
          covidTests={covidTests}
          minTabViewHeight={minTabViewHeight}
          showTab={showTab}
          tabViewHeight={tabViewHeight}
        />
      )}
    />
  );

  const instance = renderer.create(element).root;
  return { instance };
}

const EMPTY_COVID_TESTS = [] as TCovidTest[];
const COVID_TESTS_INC_OTHER = [
  { is_rapid_test: false, mechanism: 'nose_throat_swab' }, // PCR
  { is_rapid_test: true, mechanism: 'nose_throat_swab' }, // Lateral
  { is_rapid_test: true, mechanism: 'nose_throat_swab' }, // Lateral
  { mechanism: 'blood_sample_finger_prick' }, // Antibody
  { mechanism: 'blood_sample_needle_draw' }, // Antibody
  { mechanism: 'other blah blah test' }, // Other
] as TCovidTest[];

describe('CovidTestTabbedListsScreen tests', () => {
  it('renders without crashing', () => {
    const covidTests = EMPTY_COVID_TESTS;
    const showTab = 'Lateral';

    const instance = createComponent(covidTests, showTab).instance;
    expect(instance).toBeDefined();
  });

  it('renders 3 tabs as default', () => {
    const covidTests = EMPTY_COVID_TESTS;
    const showTab = 'Lateral';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(TabBarItem).length).toBe(3);
  });

  it('renders 4 tabs if a test with an "other" mechanism is present', () => {
    const covidTests = COVID_TESTS_INC_OTHER;
    const showTab = 'Lateral';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(TabBarItem).length).toBe(4);
  });

  it('renders the right number of tests in each tab - Lateral', () => {
    const covidTests = COVID_TESTS_INC_OTHER;
    const showTab = 'Lateral';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(2);
  });

  it('renders the right number of tests in each tab - PCR', () => {
    const covidTests = COVID_TESTS_INC_OTHER;
    const showTab = 'PCR';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(1);
  });

  it('renders the right number of tests in each tab - Antibody', () => {
    const covidTests = COVID_TESTS_INC_OTHER;
    const showTab = 'Antibody';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(2);
  });

  it('renders the right number of tests in each tab - Other', () => {
    const covidTests = COVID_TESTS_INC_OTHER;
    const showTab = 'Other';

    const instance = createComponent(covidTests, showTab).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(1);
  });
});

/* eslint-env jest */

import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { VaccineListScreenUpdated } from '@covid/features';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { VaccineDoseRow } from '../components/VaccineDoseRow';

jest.useFakeTimers();

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);
const flushPromises = () => new Promise(setImmediate);

const DUMMY_PATIENT_ID_CURRENT = 'current_paitent_abc123';
const ROUTE_PARAM_PATIENT_ID: Object = { assessmentData: { patientData: { patientId: DUMMY_PATIENT_ID_CURRENT } } };

const DUMMY_VACCINE_WITH_TWO_DOSES: TVaccineRequest = {
  brand: null,
  doses: [
    {
      batch_number: 'Seq1',
      brand: 'pfizer',
      date_taken_specific: '2021-08-02',
      description: null,
      id: 'xyz123',
      location: null,
      sequence: 1,
    },
    {
      batch_number: 'Modena 1111111',
      brand: 'moderna',
      date_taken_specific: '2021-08-11',
      description: null,
      id: '123xyz',
      location: null,
      sequence: 2,
    },
  ],
  id: 'abc123',
  patient: DUMMY_PATIENT_ID_CURRENT,
  placebo: null,
  vaccine_type: 'covid_vaccine',
};

describe('CovidTestListScreen tests', () => {
  it('renders VaccineListScreenUpdated', async () => {
    const elementBase = <MockedNavigator Component={VaccineListScreenUpdated} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(VaccineListScreenUpdated)).toBeTruthy();
  });

  it('renders 2 doses when 2 doses exist', async () => {
    jest.spyOn(vaccineApiClient, 'listVaccines').mockReturnValue(Promise.resolve([DUMMY_VACCINE_WITH_TWO_DOSES]));
    const elementBase = <MockedNavigator Component={VaccineListScreenUpdated} initialParams={ROUTE_PARAM_PATIENT_ID} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(2);
    });
  });

  it('renders 0 doses when 0 doses exist', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([]));
    const elementBase = <MockedNavigator Component={VaccineListScreenUpdated} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(0);
    });
  });
});

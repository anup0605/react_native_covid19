/* eslint-env jest */

import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { AboutYourVaccineScreenUpdated } from '@covid/features';
import { initialState } from '../../../../__mocks__/mockedInitialState';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';
jest.useFakeTimers();

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);
const flushPromises = () => new Promise(setImmediate);

const ROUTE_PARAM_EDIT_INDEX: Object = { editIndex: 1 };
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

describe('AboutYourVaccineScreenUpdated tests', () => {
  it('renders AboutYourVaccineScreenUpdated', async () => {
    const elementBase = <MockedNavigator Component={AboutYourVaccineScreenUpdated} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(AboutYourVaccineScreenUpdated)).toBeTruthy();
  });

  it('shows add mode if edit index not passed', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([]));
    const elementBase = (
      <MockedNavigator Component={AboutYourVaccineScreenUpdated} initialParams={{ ...ROUTE_PARAM_PATIENT_ID }} />
    );
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await act(() => {
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).toContain('Add dose');
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).not.toContain(
        'Edit dose',
      );
    });
  });

  it('shows edit mode if edit index passed', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([]));
    const elementBase = (
      <MockedNavigator
        Component={AboutYourVaccineScreenUpdated}
        initialParams={{ ...ROUTE_PARAM_EDIT_INDEX, ...ROUTE_PARAM_PATIENT_ID }}
      />
    );
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await act(() => {
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).toContain(
        'Edit dose',
      );
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).not.toContain(
        'Add dose',
      );
    });
  });
});

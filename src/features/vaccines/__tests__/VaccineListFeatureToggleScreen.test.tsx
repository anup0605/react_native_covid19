/* eslint-env jest */

import { VaccineListFeatureToggleScreen } from '@covid/features';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { AboutYourVaccineScreenOld } from '../AboutYourVaccineScreenOld';
import { AboutYourVaccineScreenUpdated } from '../AboutYourVaccineScreenUpdated';
import { VaccineListScreenOld } from '../VaccineListScreenOld';
import { VaccineListScreenUpdated } from '../VaccineListScreenUpdated';

jest.useFakeTimers();

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

const ROUTE_LIST = { viewName: 'LIST' };
const ROUTE_ADD_EDIT_DELETE = { viewName: 'ADD_EDIT_DELETE' };
const STARTUP_TRUE = { content: { startupInfo: { show_new_vaccines_ui: true } } };
const STARTUP_FALSE = { content: { startupInfo: { show_new_vaccines_ui: false } } };

describe('VaccineListFeatureToggleScreen tests', () => {
  it('renders VaccineListFeatureToggleScreen', async () => {
    const elementBase = <MockedNavigator Component={VaccineListFeatureToggleScreen} initialParams={ROUTE_LIST} />;
    const store = mockStore({ ...initialState, ...STARTUP_TRUE });
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(VaccineListFeatureToggleScreen)).toBeTruthy();
  });

  it('renders the "old" LIST view when show_new_vaccines_ui is false', async () => {
    const elementBase = <MockedNavigator Component={VaccineListFeatureToggleScreen} initialParams={ROUTE_LIST} />;
    const store = mockStore({ ...initialState, ...STARTUP_FALSE });
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(VaccineListScreenOld)).toBeTruthy();
  });

  it('renders the "new" LIST view when show_new_vaccines_ui is true', async () => {
    const elementBase = <MockedNavigator Component={VaccineListFeatureToggleScreen} initialParams={ROUTE_LIST} />;
    const store = mockStore({ ...initialState, ...STARTUP_TRUE });
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(VaccineListScreenUpdated)).toBeTruthy();
  });

  it('renders the "old" ADD_EDIT_DELETE view when show_new_vaccines_ui is false', async () => {
    const elementBase = (
      <MockedNavigator Component={VaccineListFeatureToggleScreen} initialParams={ROUTE_ADD_EDIT_DELETE} />
    );
    const store = mockStore({ ...initialState, ...STARTUP_FALSE });
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(AboutYourVaccineScreenOld)).toBeTruthy();
  });

  it('renders the "new" ADD_EDIT_DELETE view when show_new_vaccines_ui is true', async () => {
    const elementBase = (
      <MockedNavigator Component={VaccineListFeatureToggleScreen} initialParams={ROUTE_ADD_EDIT_DELETE} />
    );
    const store = mockStore({ ...initialState, ...STARTUP_TRUE });
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(AboutYourVaccineScreenUpdated)).toBeTruthy();
  });
});

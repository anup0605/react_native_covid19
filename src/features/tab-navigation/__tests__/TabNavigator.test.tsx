/* eslint-env jest */

import { DashboardUKScreen } from '@covid/features/dashboard/DashboardUKScreen';
import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

const store = mockStore({
  ...initialState,
});

function createComponent() {
  const element = (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <MockedNavigator Component={TabNavigator} />
      </ThemeProvider>
    </ReduxProvider>
  );

  const instance = renderer.create(element).root;
  return { instance };
}

describe('Tab Navigator tests', () => {
  it('renders without crashing', () => {
    const instance = createComponent().instance;
    expect(instance).toBeDefined();
  });

  it('renders the Home and Studies tabs', async () => {
    const instance = createComponent().instance;
    expect(instance.findByProps({ testID: 'tab-home' })).toBeDefined();
    expect(instance.findByProps({ testID: 'tab-studies' })).toBeDefined();
  });

  it('shows Home screen stack when selected', async () => {
    const instance = createComponent().instance;
    expect(instance.findAllByType(DashboardUKScreen).length).toBe(1);
    // add expectation to not see the studies stack
  });

  // TODO: add tests to show clicking on studies tab works as expected
});
import { TRootState } from '@covid/core/state/root';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from './mockedInitialState';

type TConfig = {
  mockNavigator?: boolean;
  mockRedux?: boolean;
  mockSafeAreaProvider?: boolean;
  mockTheme?: boolean;
  state?: TRootState;
};

const initialMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

export function createMockedElement(element: React.ReactElement, config?: TConfig) {
  let mockedElement = element;
  if (config?.mockRedux !== false) {
    const middlewares = getDefaultMiddleware();
    const mockStore = createMockStore(middlewares);
    const store = mockStore(config?.state || initialState);
    mockedElement = <ReduxProvider store={store}>{mockedElement}</ReduxProvider>;
  }
  if (config?.mockTheme !== false) {
    mockedElement = <ThemeProvider theme={theme}>{mockedElement}</ThemeProvider>;
  }
  if (config?.mockSafeAreaProvider !== false) {
    mockedElement = <SafeAreaProvider initialMetrics={initialMetrics}>{mockedElement}</SafeAreaProvider>;
  }
  return mockedElement;
}

/* eslint-env jest */

import { StudiesListScreen } from '@covid/features/studies-hub/screens/StudiesListScreen';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

describe('StudiesListScreen tests', () => {
  it('renders correct version for consented users', () => {
    const store = mockStore({ content: { startupInfo: { wider_health_studies_consent: true } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <StudiesListScreen />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ testID: 'studies-hub-screen-title' }).props.children).toContain(
      "Studies you're eligible for",
    );
  });

  it('renders correct version for not consented users', () => {
    const store = mockStore({ content: { startupInfo: { wider_health_studies_consent: false } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <StudiesListScreen />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ testID: 'studies-hub-screen-title' }).props.children).toContain(
      'COVID-related studies',
    );
  });
});

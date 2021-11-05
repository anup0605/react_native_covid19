/* eslint-env jest */

import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../../__mocks__/mockedInitialState';
import { StudyHubFeedbackModal } from '../StudyHubFeedbackModal';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);

const initialMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

// TODO: Implement once backend hooked up
// jest.mock('@covid/core/patient/PatientService', () => ({
//   patientService: {
//     updatePatientInfo: jest.fn().mockImplementation(() => {
//       return Promise.resolve(true);
//     }),
//   },
// }));

jest.useFakeTimers();

describe('Study Hub feedback modal tests', () => {
  it('Submit feedback button is disabled if no feedback provided', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <StudyHubFeedbackModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
            />
          </SafeAreaProvider>
        </ReduxProvider>
        ,
      </ThemeProvider>,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    const button = getByTestId('button-send-feedback');
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
  });

  it('Submit feedback button is enabled if negative feedback provided', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <StudyHubFeedbackModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
            />
          </SafeAreaProvider>
        </ReduxProvider>
        ,
      </ThemeProvider>,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);

    const thumbsDownIcon = getByTestId('study-hub-feedback-negative');
    await fireEvent.press(thumbsDownIcon);
    const button = getByTestId('button-send-feedback');
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('Submit feedback button is enabled if positive feedback provided', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <StudyHubFeedbackModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
            />
          </SafeAreaProvider>
        </ReduxProvider>
        ,
      </ThemeProvider>,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);

    const thumbsUpIcon = getByTestId('study-hub-feedback-positive');
    await fireEvent.press(thumbsUpIcon);
    const button = getByTestId('button-send-feedback');
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('displays close button and calls onRequestClose on tap', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <StudyHubFeedbackModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
            />
          </SafeAreaProvider>
        </ReduxProvider>
        ,
      </ThemeProvider>,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    const closeButton = getByTestId('button-close-modal');
    await fireEvent.press(closeButton);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });
});

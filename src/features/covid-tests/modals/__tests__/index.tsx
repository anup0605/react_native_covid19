import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import CovidTestListOnboardingModal from '../CovidTestListOnboardingModal';

const DUMMY_PATIENT_ID = '123abc';

jest.mock('@covid/core/patient/PatientService', () => ({
  patientService: {
    updatePatientInfo: jest.fn().mockImplementation((patientId: string, infos: Partial<TPatientInfosRequest>) => {
      return Promise.resolve(true);
    }),
  },
}));

jest.useFakeTimers();

describe('Covid tests onboarding modal tests', () => {
  it('calls onRequestClose when out of slides', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <CovidTestListOnboardingModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
        patientId={DUMMY_PATIENT_ID}
      />,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    const button = getByTestId('covid-test-modal-button');
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('moves to next slide on tap of button', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <CovidTestListOnboardingModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
        patientId={DUMMY_PATIENT_ID}
      />,
    );
    const button = getByTestId('covid-test-modal-button');

    let screen0 = queryByTestId('covid-test-modal-screen-0');
    let screen1 = queryByTestId('covid-test-modal-screen-1');
    let screen2 = queryByTestId('covid-test-modal-screen-2');
    let screen3 = queryByTestId('covid-test-modal-screen-3');

    expect(screen0).toBeTruthy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-screen-0');
    screen1 = queryByTestId('covid-test-modal-screen-1');
    screen2 = queryByTestId('covid-test-modal-screen-2');
    screen3 = queryByTestId('covid-test-modal-screen-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeTruthy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-screen-0');
    screen1 = queryByTestId('covid-test-modal-screen-1');
    screen2 = queryByTestId('covid-test-modal-screen-2');
    screen3 = queryByTestId('covid-test-modal-screen-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeTruthy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-screen-0');
    screen1 = queryByTestId('covid-test-modal-screen-1');
    screen2 = queryByTestId('covid-test-modal-screen-2');
    screen3 = queryByTestId('covid-test-modal-screen-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeTruthy();
  });
});

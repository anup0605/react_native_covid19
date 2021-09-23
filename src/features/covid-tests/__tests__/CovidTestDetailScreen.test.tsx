/* eslint-env jest */

import CovidTestDetailScreen from '@covid/features/covid-tests/CovidTestDetailScreen';
import { theme } from '@covid/themes';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { CovidTestMechanismQuestion } from '../fields/CovidTestMechanismQuestion';

function createComponent() {
  const element = (
    <ThemeProvider theme={theme}>
      <MockedNavigator Component={CovidTestDetailScreen} />
    </ThemeProvider>
  );

  const instance = renderer.create(element).root;
  return { instance };
}

describe('CovidTestDetailScreen tests', () => {
  it('renders without crashing', () => {
    const instance = createComponent().instance;
    expect(instance).toBeDefined();
  });

  it('displays the COVID test mechanism question', () => {
    const instance = createComponent().instance;
    const mechanismQuestion = instance.findByType(CovidTestMechanismQuestion);
    expect(mechanismQuestion).toBeTruthy();
  });

  // TODO: Figure out how to test conditional rendering of questions based on mechanism chosen
});

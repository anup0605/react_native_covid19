/* eslint-env jest */
import { Text } from '@covid/components';
import CovidTestListScreen from '@covid/features/covid-tests/CovidTestListScreen';
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
const store = mockStore(initialState);

describe('CovidTestListScreen tests', () => {
  it('renders conditional introductory copy', () => {
    const elementBase = <MockedNavigator Component={CovidTestListScreen} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;

    // NOTE: It seems that no covid tests are loading from service for this case.
    // TODO: Can't get the mocking of the CovidTestService call to work, so I can set whether a test has been logged by a user and check alternative.
    expect(instance.findByProps({ testID: 'covid-test-list-introduction' }).props.children).toContain(
      'If you’ve ever had a COVID-19 test',
    );

    expect(instance.findAllByType(Text).map((t) => t.props.children)).not.toContain('Test type');
  });
});

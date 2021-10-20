/* eslint-env jest */
import { TRootState } from '@covid/core/state/root';
import { LinkItem } from '@covid/features/menu/LinkItem';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { LinksSection } from '../LinksSection';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

const IS_TESTER = { content: { startupInfo: { is_tester: true } } };
const IS_NOT_TESTER = { content: { startupInfo: { is_tester: false } } };

function createTestInstance(store: TRootState) {
  return renderer.create(
    // @ts-expect-error
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        {/* @ts-expect-error */}
        <MockedNavigator Component={LinksSection} />
      </ThemeProvider>
    </ReduxProvider>,
  ).root;
}

describe('LinksSection tests', () => {
  it('shows the testing mode link when is_tester is true', async () => {
    const store = mockStore({ ...initialState, ...IS_TESTER });
    // @ts-expect-error
    const instance = createTestInstance(store);
    expect(
      instance
        .findAllByType(LinkItem)
        .filter((linkItemInstance) => linkItemInstance.props.analyticsName === 'TESTING_MODE').length,
    ).toEqual(1);
  });

  it('does not show the testing mode link when is_tester is false', async () => {
    const store = mockStore({ ...initialState, ...IS_NOT_TESTER });
    // @ts-expect-error
    const instance = createTestInstance(store);
    expect(
      instance
        .findAllByType(LinkItem)
        .filter((linkItemInstance) => linkItemInstance.props.analyticsName === 'TESTING_MODE').length,
    ).toEqual(0);
  });
});

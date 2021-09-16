/* eslint-env jest */
import { LinkItem } from '@covid/features/menu/DrawerMenuItem';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { LinksSection } from '../LinksSection';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

const IS_TESTER = { content: { startupInfo: { is_tester: true } } };
const IS_NOT_TESTER = { content: { startupInfo: { is_tester: false } } };

describe('LinksSection tests', () => {
  it('shows the testing mode link when is_tester is true', async () => {
    const store = mockStore({ ...initialState, ...IS_TESTER });
    const elementBase = <MockedNavigator Component={LinksSection} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const instance = renderer.create(elementWithRedux).root;

    expect(instance.findAllByType(LinkItem).filter((link) => link.props.type === 'TESTING_MODE').length).toEqual(1);
  });

  it('does not show the testing mode link when is_tester is false', async () => {
    const store = mockStore({ ...initialState, ...IS_NOT_TESTER });
    const elementBase = <MockedNavigator Component={LinksSection} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const instance = renderer.create(elementWithRedux).root;

    expect(instance.findAllByType(LinkItem).filter((link) => link.props.type === 'TESTING_MODE').length).toEqual(0);
  });
});

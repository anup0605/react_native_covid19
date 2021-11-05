/* eslint-env jest */

import { RowInterested } from '@covid/features/studies-hub/components/RowInterested';
import { TStudy } from '@covid/features/studies-hub/types';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { createMockedElement } from '../../../../../__mocks__/createMockedElement';

const mockedStudy: TStudy = require('./mocked_study.json');

describe('RowInterested tests', () => {
  it('opens the interest shown modal under the right condition', async () => {
    const mockedState = { content: { startupInfo: { studies_hub_interested_modal_seen: false } } };

    const mockedElement = createMockedElement(<RowInterested active={false} study={mockedStudy} />, {
      state: mockedState,
    });
    const renderAPI = await render(mockedElement);

    // Click on the heart while it's inactive
    const iconHeart = await renderAPI.getByTestId(`row-interested-${mockedStudy.id}-icon-heart`);
    await fireEvent.press(iconHeart);

    // Check that the modal is shown
    await expect(renderAPI.getByTestId('interest-shown-modal-close-button')).toBeTruthy();

    // Close the modal
    const closeButton = await renderAPI.getByTestId('interest-shown-modal-close-button');
    await fireEvent.press(closeButton);

    // Check that modal is gone
    await expect(renderAPI.queryByTestId('interest-shown-modal-close-button')).toBeFalsy();

    // Click on the heart while it's active
    // Check that the modal is not shown

    // expect(onPress).toHaveBeenCalledTimes(0);
    // const button = getByTestId('button-test-ID');
    // fireEvent.press(button);
    // expect(onPress).toHaveBeenCalledTimes(1);

    // expect(instance.findByProps({ testID: 'interest-shown-modal-close-button' })).toBeTruthy();
  });

  it("doesn't open the interest shown modal when user already clicked on it", () => {});
});

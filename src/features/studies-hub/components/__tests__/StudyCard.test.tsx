/* eslint-env jest */

import { StudyCard } from '@covid/features/studies-hub/components/StudyCard';
import { TStudy } from '@covid/features/studies-hub/types';
import { theme } from '@covid/themes';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

const mockedStudy: TStudy = require('./mocked_study.json');

describe('StudyCard tests', () => {
  it('renders correct version for users who shown interest', () => {
    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <StudyCard active onPress={() => {}} study={mockedStudy} />
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ full: true, testID: `row-interested-${mockedStudy.id}-icon-heart` })).toBeTruthy();
  });

  it('renders correct version for users who have not shown interest', () => {
    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <StudyCard active={false} onPress={() => {}} study={mockedStudy} />
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ full: false, testID: `row-interested-${mockedStudy.id}-icon-heart` })).toBeTruthy();
  });
});

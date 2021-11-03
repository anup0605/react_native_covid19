/* eslint-env jest */

import { StudyCard } from '@covid/features/studies-hub/components/StudyCard';
import { TStudy } from '@covid/features/studies-hub/types';
import { theme } from '@covid/themes';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

const study: TStudy = {
  amountParticipants: 1000,
  duration: '1 day',
  id: '1',
  organiser: 'ZOE',
  title: 'Our first study',
};

describe('StudyCard tests', () => {
  it('renders correct version for users who shown interest', () => {
    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <StudyCard active onPress={() => {}} study={study} />
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ full: true, testID: `study-card-${study.id}-icon-heart` })).toBeTruthy();
  });

  it('renders correct version for users who have not shown interest', () => {
    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <StudyCard active={false} onPress={() => {}} study={study} />
      </ThemeProvider>,
    ).root;

    expect(instance.findByProps({ full: false, testID: `study-card-${study.id}-icon-heart` })).toBeTruthy();
  });
});

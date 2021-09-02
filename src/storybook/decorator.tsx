import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';

export const PaddingView = (fn: () => React.ReactNode) => <View style={{ marginHorizontal: sizes.m }}>{fn()}</View>;

export const CenterView = (fn: () => React.ReactNode) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>{fn()}</View>
);

export const DarkBackground = (fn: () => React.ReactNode) => (
  <View style={{ backgroundColor: colors.predict, flex: 1 }}>{fn()}</View>
);

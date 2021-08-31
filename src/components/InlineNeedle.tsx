import Needle from '@assets/icons/Needle';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

export const InlineNeedle: React.FC = () => (
  <View style={{ marginRight: sizes.xs, top: -2 }}>
    <Needle />
  </View>
);

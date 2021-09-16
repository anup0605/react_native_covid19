import { TGridSize } from '@covid/themes';
import * as React from 'react';
import { View } from 'react-native';

interface IProps {
  space?: TGridSize;
}

export default function Spacer({ space = 8 }: IProps) {
  return <View style={{ height: space, width: space }} />;
}

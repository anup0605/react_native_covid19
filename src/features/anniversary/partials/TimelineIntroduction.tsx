import { SolidColorBar, Text } from '@covid/components';
import { colors } from '@theme';
import * as React from 'react';
import { View } from 'react-native';

export default function TimelineIntroduction() {
  return (
    <View accessible>
      <Text rhythm={32} textClass="h3">
        Your unique contribution to science
      </Text>
      <Text rhythm={32}>
        Your personal timeline shows all you've helped achieve so far and future discoveries you can still be part of.
      </Text>
      <SolidColorBar backgroundColor={colors.tertiary} height={1} />
    </View>
  );
}

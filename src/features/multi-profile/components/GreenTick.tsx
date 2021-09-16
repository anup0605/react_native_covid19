import { tick } from '@assets';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const GreenTick: React.FC = () => (
  <View style={styles.circle}>
    <Image source={tick} style={styles.tick} />
  </View>
);

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: sizes.m,
    height: sizes.m * 2,
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    top: 0,
    width: sizes.m * 2,
    zIndex: 1,
  },
  tick: {
    height: 30,
    width: 30,
  },
});

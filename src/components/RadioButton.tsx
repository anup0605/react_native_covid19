import { sizes } from '@covid/themes';
import { colors } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  selected: boolean;
}

export function RadioButton(props: IProps) {
  return <View style={styles.wrapper}>{props.selected ? <View style={styles.dot} /> : null}</View>;
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.brand,
    borderRadius: sizes.xxs,
    height: sizes.xxs * 2,
    width: sizes.xxs * 2,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: colors.backgroundFour,
    borderRadius: sizes.s,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
});

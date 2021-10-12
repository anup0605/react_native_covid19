// @todo: replace all existing dividers with this component
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export function Divider() {
  return <View style={styles.view} />;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colors.backgroundFour,
    height: 1,
    width: '100%',
  },
});

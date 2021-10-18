import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  children?: React.ReactNode;
  showDot: boolean;
};

export function WithNotificationDot(props: TProps) {
  return (
    <View>
      {props.children}
      {props.showDot ? <View style={styles.dot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.purple,
    borderRadius: 8,
    height: 16,
    position: 'absolute',
    right: -8,
    top: -8,
    width: 16,
  },
});

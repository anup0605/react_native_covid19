import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  children?: React.ReactNode;
};

export const FlexView = ({ children }: TProps) => {
  return <View style={styles.flexView}>{children}</View>;
};

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
});

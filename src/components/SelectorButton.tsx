import { sizes } from '@covid/themes';
import { colors, fontStyles } from '@theme';
import { Text } from 'native-base';
import * as React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  testID?: string;
  disable?: boolean;
}

export function SelectorButton(props: IProps) {
  return (
    <TouchableOpacity
      disabled={props.disable}
      onPress={props.onPress}
      style={props.style}
      testID={props.testID ?? 'button-test-ID'}
    >
      <View style={styles.bigButton}>
        <Text style={[fontStyles.bodyReg, styles.buttonText]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    backgroundColor: colors.white,
    borderColor: colors.brand,
    borderRadius: sizes.xs,
    borderWidth: 1,
    padding: sizes.m,
  },

  buttonText: {
    color: colors.brand,
    textAlign: 'center',
  },
});

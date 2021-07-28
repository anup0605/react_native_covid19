import { colors } from '@theme';
import * as React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TProps = {
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
};

const buttonStyles = StyleSheet.create({
  bigButton: {
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderRadius: 28,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },

  buttonText: {
    color: colors.secondary,
    textAlign: 'center',
  },
});

function BigButton(props: TProps) {
  return (
    <TouchableOpacity onPress={props.onPress} testID="button-test-ID">
      <View style={buttonStyles.bigButton}>
        <Text style={buttonStyles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BigButton;

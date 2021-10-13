import { BrandedButton } from '@covid/components';
import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';

type TProps = {
  onPress: () => void;
  text: string;
  testID?: string;
};

export function OutlineButton(props: TProps) {
  return (
    <BrandedButton onPress={props.onPress} style={styles.button} testID={props.testID}>
      <RegularText style={styles.text}>{props.text}</RegularText>
    </BrandedButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
  },
  text: {
    color: colors.purple,
  },
});

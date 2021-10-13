import { Text } from '@covid/components';
import { ArrowRight } from '@covid/features/wider-health-studies/components/ArrowRight';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type TProps = {
  onPress: () => void;
  testID?: string;
  text: string;
};

export function ArrowLink(props: TProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.view} testID={props.testID}>
      <ArrowRight />
      <Text inverted colorPalette="actionSecondary" colorShade="main" style={styles.text} textClass="pMedium">
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    marginLeft: sizes.xs,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

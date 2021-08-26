import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, Switch as RNSwitch, View, ViewStyle } from 'react-native';

import { requiredFormMarker } from './Form';

interface IProps {
  label: string;
  selectedValue: boolean;
  required?: boolean;
  toggleSwitch: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Switch(props: IProps) {
  return (
    <View style={[styles.fieldWrapper, props.style]}>
      <RNSwitch
        accessibilityLabel={props.label}
        ios_backgroundColor={colors.backgroundTertiary}
        onValueChange={props.toggleSwitch}
        thumbColor={colors.white}
        trackColor={{ false: colors.backgroundTertiary, true: colors.brand }}
        value={props.selectedValue}
      />
      <Text style={styles.label} textClass="h6Light">
        {props.label}
        {props.required ? requiredFormMarker : null}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: colors.black,
    marginLeft: grid.m,
  },
});

export default Switch;

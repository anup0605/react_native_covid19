import { sizes, styling } from '@covid/themes';
import * as React from 'react';
import { AccessibilityRole, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps {
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  backgroundColor?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  useShadow?: boolean;
}

export default function Card(props: IProps) {
  const style = [
    {
      backgroundColor: props.backgroundColor ?? '#ffffff',
      borderRadius: sizes.m,
      padding: props.padding ?? sizes.l,
    },
    props.useShadow && styling.shadow,
    props.style,
  ];

  if (props.onPress) {
    return (
      <TouchableOpacity
        accessible
        accessibilityLabel={props.accessibilityLabel}
        accessibilityRole={props.accessibilityRole}
        onPress={props.onPress}
        style={style}
        testID={props.testID}
      >
        {props.children}
      </TouchableOpacity>
    );
  }
  return (
    <View style={style} testID={props.testID}>
      {props.children}
    </View>
  );
}

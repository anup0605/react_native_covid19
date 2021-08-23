import { Icon, TIconName } from '@covid/components/icons';
import { Text } from '@covid/components/typography';
import { TTypeSizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  color?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
}

function Link(props: IProps) {
  const linkColor = props.color || 'purple';
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      onPress={props.onPress}
      style={[{ flexDirection: 'row' }, props.style]}
    >
      <Icon
        color={linkColor}
        iconName={'big-arrow-right' || props.iconName}
        iconSize={props.iconSize || 16}
        style={{ marginRight: 8, marginTop: 2 }}
      />
      <Text style={{ color: linkColor, flex: 1 }}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Link;

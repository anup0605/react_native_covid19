import { Icon, TIconName } from '@covid/components/icons';
import { sizes, TTypeSizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  active?: boolean;
  backgroundColor?: string;
  backgroundSize?: TTypeSizes;
  iconColor?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

function CheckBoxButton({
  active = true,
  backgroundColor = colors.backgroundTertiary,
  backgroundSize = 32,
  iconColor = 'black',
  iconName = 'tick',
  iconSize = 16,
  iconStyle = {},
  onPress,
}: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor,
        borderRadius: sizes.xs,
        height: backgroundSize,
        justifyContent: 'center',
        width: backgroundSize,
      }}
    >
      {active ? <Icon color={iconColor} iconName={iconName} iconSize={iconSize} style={iconStyle} /> : null}
    </TouchableOpacity>
  );
}
export default CheckBoxButton;

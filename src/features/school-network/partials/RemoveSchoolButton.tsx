import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps {
  onPress: () => void;
  text: string;
}

function RemoveSchoolButton({ onPress, text }: IProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 16 }}>
      <RegularText style={{ color: colors.coral, textAlign: 'center' }}>{text}</RegularText>
    </TouchableOpacity>
  );
}

export default RemoveSchoolButton;

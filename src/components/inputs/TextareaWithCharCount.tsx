import { CaptionText } from '@covid/components/Text';
import { Textarea } from 'native-base';
import * as React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';

interface IProps {
  bordered?: boolean;
  maxLength?: number;
  onChangeText: (value: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  rowSpan?: number;
  style?: StyleProp<ViewStyle>;
  textAreaStyle?: StyleProp<TextStyle>;
  testID?: string;
  value?: string;
}

const DEFAULT_MAX_LENGTH = 1000;
const DEFAULT_ROW_SPAN = 5;

export default function TextareaWithCharCount(props: IProps) {
  const [charCount, setCharCount] = React.useState(0);

  const maxLength = props.maxLength || DEFAULT_MAX_LENGTH;

  return (
    <View style={props.style}>
      <Textarea
        bordered={props.bordered || false}
        maxLength={maxLength}
        onChangeText={(value) => {
          props.onChangeText(value);
          setCharCount(value.length);
        }}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        rowSpan={props.rowSpan || DEFAULT_ROW_SPAN}
        style={props.textAreaStyle}
        testID={props.testID}
        underline={false}
        value={props.value}
      />
      <CaptionText style={{ alignSelf: 'flex-end' }}>
        {charCount} / {maxLength}
      </CaptionText>
    </View>
  );
}

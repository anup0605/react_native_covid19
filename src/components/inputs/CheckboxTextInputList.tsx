import Check from '@assets/icons/Check';
import { Text, TextareaWithCharCount } from '@covid/components';
import { requiredFormMarker } from '@covid/components/Form';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IOption {
  id: string;
  label: string;
  value?: string;
}

interface IProps {
  dark?: boolean;
  options: IOption[];
  label?: string;
  onChange: (value: string | undefined, index: number) => void;
  required?: boolean;
  testID?: string;
}

export default React.memo(function CheckboxTextInputList(props: IProps) {
  return (
    <View>
      {props.required || props.label ? (
        <Text inverted colorPalette="uiDark" colorShade="darker" rhythm={16} textClass="p">
          {props.label}
          {props.required ? `${requiredFormMarker}` : null}
        </Text>
      ) : null}
      {(props.options || []).map((option, index) => (
        <>
          <TouchableOpacity
            accessible
            accessibilityRole="checkbox"
            key={`checkbox-touchable-${option.id}`}
            onPress={() => props.onChange(option.value === undefined ? '' : undefined, index)}
            style={styles.touchable}
            testID={`${props.testID || 'checkbox'}-${option.id}`}
          >
            <View style={props.dark ? styles.checkBoxDark : styles.checkBox}>
              {option.value !== undefined ? <Check color={colors.purple} /> : null}
            </View>
            <Text rhythm={16} style={styles.text} textClass="pLight">
              {option.label}
            </Text>
          </TouchableOpacity>
          {option.value !== undefined ? (
            <TextareaWithCharCount
              bordered={false}
              onChangeText={(text) => props.onChange(text, index)}
              placeholder="Please add any comments"
              placeholderTextColor={colors.tertiary}
              rowSpan={5}
              style={styles.marginBottom}
              testID={`${props.testID || 'textarea'}-${option.id}`}
              textAreaStyle={styling.textarea}
              value={option.value}
            />
          ) : null}
        </>
      ))}
    </View>
  );
});

const checkBoxStyle: ViewStyle = {
  alignItems: 'center',
  backgroundColor: colors.backgroundTertiary,
  borderRadius: sizes.xs,
  height: 32,
  justifyContent: 'center',
  marginRight: sizes.m,
  width: 32,
};

const styles = StyleSheet.create({
  checkBox: checkBoxStyle,
  checkBoxDark: {
    ...checkBoxStyle,
    borderColor: '#C4C4C4',
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  text: {
    flex: 1,
    marginBottom: 0,
  },
  touchable: {
    flexDirection: 'row',
    marginBottom: sizes.m,
  },
});

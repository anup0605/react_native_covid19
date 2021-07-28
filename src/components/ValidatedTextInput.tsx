import Error from '@assets/icons/Error';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface IProps extends TextInputProps {
  error?: boolean;
  label?: string;
  testID?: string;
  viewStyle?: StyleProp<ViewStyle>;
}

export class ValidatedTextInput extends React.Component<IProps, object> {
  private textInput: TextInput | null;

  focus() {
    this.textInput?.focus();
  }

  render() {
    return (
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: this.props.error ? colors.feedbackBad : 'transparent',
          },
          this.props.viewStyle,
        ]}
      >
        <TextInput
          placeholderTextColor={colors.secondary}
          ref={(input) => (this.textInput = input)}
          {...this.props}
          style={[styles.inputStyle, this.props.multiline ? styles.multipleLines : styles.singleLine, this.props.style]}
        />
        {this.props.error ? <Error /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    color: colors.primary,
    flex: 1,
    fontFamily: 'SofiaProRegular',
    fontSize: 16,
    paddingLeft: 12,
    paddingRight: 16,
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 8,
  },
  multipleLines: {
    height: 96,
    marginVertical: 8,
  },
  singleLine: {
    height: 48,
  },
});

import { requiredFormMarker } from '@covid/components/Form';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { KeyboardTypeOptions, StyleProp, TextInputProps, View, ViewStyle } from 'react-native';

interface IProps extends TextInputProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
}

export function GenericTextField(props: IProps) {
  const { formikProps, name, label, placeholder, keyboardType, showError, style, inputProps, ...otherProps } = props;

  return (
    <View style={[{ marginVertical: sizes.m }, style]}>
      {label ? (
        <RegularText>
          {label}
          {props.required ? requiredFormMarker : null}
        </RegularText>
      ) : null}
      <ValidatedTextInput
        error={formikProps.touched[name] && formikProps.errors[name]}
        keyboardType={keyboardType}
        onBlur={formikProps.handleBlur(name)}
        onChangeText={formikProps.handleChange(name)}
        onSubmitEditing={() => {}}
        placeholder={props.placeholder}
        required={props.required}
        returnKeyType="next"
        value={formikProps.values[name]}
        {...inputProps}
        {...otherProps}
      />

      {showError && !!formikProps.touched[name] && !!formikProps.errors[name] ? (
        <ValidationError error={formikProps.errors[name]} />
      ) : null}
    </View>
  );
}

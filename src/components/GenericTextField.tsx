import { requiredFormMarker } from '@covid/components/Form';
import { CaptionText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikErrors, FormikProps } from 'formik';
import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IProps extends TextInputProps {
  formikProps: FormikProps<any>;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showError?: boolean;
  inputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  required?: boolean;
  IconComponent?: React.ComponentType<any>;
  iconOnPress?: () => void;
}

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export function GenericTextField(props: IProps) {
  const {
    formikProps,
    name,
    label,
    description,
    placeholder,
    keyboardType,
    showError,
    style,
    inputProps,
    ...otherProps
  } = props;

  return (
    <View style={[{ marginVertical: sizes.m }, style]}>
      {label ? (
        <RegularText>
          {label}
          {props.required ? requiredFormMarker : null}
          {props.IconComponent ? (
            <TouchableOpacity hitSlop={HIT_SLOP} onPress={props.iconOnPress} style={styles.icon}>
              <props.IconComponent />
            </TouchableOpacity>
          ) : null}
        </RegularText>
      ) : null}
      {description ? (
        <CaptionText style={{ color: colors.secondary, marginBottom: sizes.m }}>{description}</CaptionText>
      ) : null}
      <ValidatedTextInput
        error={formikProps.touched[name] && !!formikProps.errors[name]}
        keyboardType={keyboardType}
        onBlur={formikProps.handleBlur(name)}
        onChangeText={formikProps.handleChange(name)}
        placeholder={props.placeholder}
        required={props.required}
        returnKeyType="next"
        value={formikProps.values[name]}
        {...inputProps}
        {...otherProps}
      />

      {showError && !!formikProps.touched[name] && !!formikProps.errors[name] ? (
        <ValidationError error={formikProps.errors[name] as FormikErrors<string>} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: sizes.xxs,
  },
});

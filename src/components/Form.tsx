import { RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

// The space character is added in this way to prevent the asterisk from being word-wrapped at the end of the line.
export const requiredFormMarker = '\u00a0*';

type TFormProps = {
  children: React.ReactNode;
  hasRequiredFields?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Form = (props: TFormProps) => (
  <View style={props.style}>
    {props.hasRequiredFields ? (
      <RegularText style={styles.marginBottom}>
        {requiredFormMarker} {i18n.t('required-field')}
      </RegularText>
    ) : null}
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

import { RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

// The space character is added in this way to prevent the asterisk from being word-wrapped at the end of the line.
export const requiredFormMarker = '\u00a0*';

type TFormProps = {
  children: React.ReactNode;
  hasRequiredFields?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Form = (props: TFormProps) => (
  <View style={[styling.flex, props.style]}>
    {props.hasRequiredFields ? (
      <RegularText style={styling.marginBottom}>
        {requiredFormMarker} {i18n.t('required-field')}
      </RegularText>
    ) : null}
    {props.children}
  </View>
);

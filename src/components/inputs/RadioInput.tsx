import { requiredFormMarker } from '@covid/components/Form';
import { RadioButton } from '@covid/components/RadioButton';
import { ErrorText, LabelText, SecondaryText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  PickerItemProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface IItem extends PickerItemProps {
  iconSource?: ImageSourcePropType;
}

interface IProps<V = any> {
  error?: string;
  hideLabel?: boolean;
  items: IItem[];
  label?: string;
  onValueChange: (value: V) => void;
  required?: boolean;
  selectedValue?: V;
  testID?: string;
  IconComponent?: React.ComponentType<any>;
  iconOnPress?: () => void;
}

const defaultItems: IItem[] = [
  { label: i18n.t('picker-no'), value: 'no' },
  { label: i18n.t('picker-yes'), value: 'yes' },
];

export function RadioInput(props: IProps) {
  const items = props.items?.length ? props.items : defaultItems;

  return (
    <View style={styles.marginVertical} testID={props.testID}>
      {props.hideLabel || !props.label ? null : (
        <LabelText style={styles.marginBottom}>
          {props.label}
          {props.required ? requiredFormMarker : null}
          {props.IconComponent ? (
            <TouchableOpacity onPress={props.iconOnPress} style={styles.icon}>
              <props.IconComponent />
            </TouchableOpacity>
          ) : null}
        </LabelText>
      )}
      {items.map((item, index) => (
        <TouchableOpacity
          accessible
          accessibilityRole="radio"
          key={`item-${item.value}`}
          onPress={() => props.onValueChange(item.value)}
          style={
            index === 0 ? styles.firstItem : index + 1 === props.items?.length ? styles.lastItem : styles.middleItem
          }
          testID={`${props.testID || 'input-radio'}-item-${item.value}`}
        >
          <RadioButton selected={props.selectedValue === item.value} />
          {item.iconSource ? <Image source={item.iconSource} style={styles.image} /> : null}
          <SecondaryText style={[styles.marginLeft, styles.textWrap]}>{item.label}</SecondaryText>
        </TouchableOpacity>
      ))}
      {props.error ? <ErrorText style={styles.marginTop}>{props.error}</ErrorText> : null}
    </View>
  );
}

const itemStyle: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
};

const styles = StyleSheet.create({
  firstItem: {
    ...itemStyle,
    paddingBottom: sizes.s,
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 2,
    paddingLeft: sizes.xxs,
  },
  image: {
    height: 24,
    marginLeft: sizes.s,
    width: 24,
  },
  lastItem: {
    ...itemStyle,
    paddingTop: sizes.s,
  },
  marginBottom: {
    marginBottom: sizes.s,
  },
  marginLeft: {
    marginLeft: sizes.s,
  },
  marginTop: {
    marginTop: sizes.s,
  },
  marginVertical: {
    marginVertical: sizes.m,
  },
  middleItem: {
    ...itemStyle,
    paddingVertical: sizes.s,
  },
  textWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

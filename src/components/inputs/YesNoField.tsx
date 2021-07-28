import { ButtonsGroup, ISingleButton } from '@covid/components/inputs/ButtonsGroup';
import i18n from '@covid/locale/i18n';
import * as React from 'react';

interface IProps {
  error?: any;
  hideLabel?: boolean;
  label?: string;
  onValueChange: any;
  selectedValue: string;
  testID?: string;
  required?: boolean;
}

const getItems = (): ISingleButton[] => [
  {
    label: i18n.t('picker-no'),
    value: 'no',
  },
  {
    label: i18n.t('picker-yes'),
    value: 'yes',
  },
];

export function YesNoField({ label, onValueChange, ...props }: IProps) {
  return <ButtonsGroup items={getItems()} label={label} onValueChange={onValueChange} {...props} />;
}

import { CheckboxItem } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { TextInputProps, View } from 'react-native';

type TBooleanCheckBoxData = {
  label: string;
  formKey: string;
};

type TAdditionalInputProps = {
  show: boolean;
  key: string;
  label: string;
  placeholder?: string;
  inputProps?: TextInputProps;
};

type TProps = {
  data: TBooleanCheckBoxData[];
  showAdditionalInputProps?: TAdditionalInputProps;
};

// Label is what is shown to user
// value is what will be marked as true or false in form data
export const BooleanCheckboxes: React.FC<TProps> = ({ data, showAdditionalInputProps }) => {
  const { values, setFieldValue, ...formik } = useFormikContext();
  return (
    <>
      {data.map((checkBoxData) => {
        return (
          <View key={checkBoxData.formKey}>
            <CheckboxItem
              onChange={(checked: boolean) => {
                setFieldValue(checkBoxData.formKey, checked);
              }}
              value={(values as any)[checkBoxData.formKey]}
            >
              {checkBoxData.label}
            </CheckboxItem>
          </View>
        );
      })}

      {showAdditionalInputProps?.show && (
        <View style={{ marginTop: 16 }}>
          <GenericTextField
            formikProps={{
              ...formik,
              setFieldValue,
              values,
            }}
            label={showAdditionalInputProps.label}
            name={showAdditionalInputProps.key}
            textInputProps={showAdditionalInputProps.inputProps}
          />
        </View>
      )}
    </>
  );
};

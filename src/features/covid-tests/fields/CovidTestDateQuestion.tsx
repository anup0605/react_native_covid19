import CalendarPicker from '@covid/components/CalendarPicker';
import { requiredFormMarker } from '@covid/components/Forms';
import Switch from '@covid/components/Switch';
import { RegularText } from '@covid/components/Text';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { grid } from '@covid/themes';
import { colors, fontStyles } from '@theme';
import { FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

export interface ICovidTestDateData {
  useApproximateDate: boolean | undefined; // only for ux logic
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
  dateTakenSpecific: Date | undefined;
}

interface IProps {
  formikProps: FormikProps<ICovidTestDateData>;
  test?: CovidTest;
  dateChangeCallback?: Function;
  label?: string
}

export interface ICovidTestDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestDateQuestion: ICovidTestDateQuestion<IProps, ICovidTestDateData> = (props: IProps) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setTestDate(selectedDate: Moment): void {
    formikProps.values.dateTakenSpecific = convertToDate(selectedDate);
    if (props.dateChangeCallback) {
      props.dateChangeCallback();
    }
  }

  function setRangeTestDates(selectedDate: Moment, type: string): void {
    // BUG: calendarPicker firing twice and sending null object on second event
    if (!selectedDate) return;
    if (type === 'END_DATE') {
      formikProps.values.dateTakenBetweenEnd = convertToDate(selectedDate);
      
    } else {
      formikProps.values.dateTakenBetweenStart = convertToDate(selectedDate);
      formikProps.values.dateTakenBetweenEnd = undefined;
    }
    if (props.dateChangeCallback) {
        props.dateChangeCallback();
      }
  }

  return (
    <>
      <RegularText style={styles.labelStyle}>
        {props.label ? props.label : i18n.t('covid-test.question-date-test-occurred')}
        {requiredFormMarker}
      </RegularText>

      <Switch
        label={i18n.t('covid-test.question-date-approximate')}
        selectedValue={formikProps.values.useApproximateDate}
        style={styles.switch}
        toggleSwitch={() => {
          const newValue = !formikProps.values.useApproximateDate;
          if (newValue) {
            formikProps.values.dateTakenSpecific = undefined;
          } else {
            formikProps.values.dateTakenBetweenStart = undefined;
            formikProps.values.dateTakenBetweenEnd = undefined;
            formikProps.values.dateTakenSpecific = undefined;
          }
          formikProps.setFieldValue('useApproximateDate', newValue);
          if (props.dateChangeCallback) {
            props.dateChangeCallback();
          }
        }}
      />

      {!formikProps.values.useApproximateDate && (
        <CalendarPicker
          maxDate={today}
          onDateChange={setTestDate}
          {...(!!formikProps.values.dateTakenSpecific && {
            selectedStartDate: formikProps.values.dateTakenSpecific,
          })}
        />
      )}

      {formikProps.values.useApproximateDate && (
        <CalendarPicker
          allowRangeSelection
          maxDate={today}
          onDateChange={setRangeTestDates}
          selectedEndDate={formikProps.values.dateTakenBetweenEnd}
          selectedStartDate={formikProps.values.dateTakenBetweenStart}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fieldText: {
    ...fontStyles.bodyReg,
    alignSelf: 'center',
    color: colors.black,
    paddingBottom: 10,
  },
  labelStyle: {
    marginVertical: 16,
  },
  switch: {
    marginBottom: grid.xxl,
  },
});

CovidTestDateQuestion.initialFormValues = (test?: CovidTest): ICovidTestDateData => {
  function getInitialUseApproximateDate(test: CovidTest | undefined): boolean {
    if (test === undefined) {
      return false;
    }
    return !test.date_taken_specific;
  }

  return {
    dateTakenBetweenEnd: test?.date_taken_between_end ? moment(test.date_taken_between_end).toDate() : undefined,
    dateTakenBetweenStart: test?.date_taken_between_start ? moment(test.date_taken_between_start).toDate() : undefined,
    dateTakenSpecific: test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,
    useApproximateDate: getInitialUseApproximateDate(test),
  };
};

CovidTestDateQuestion.schema = () => {
  return Yup.object().shape({
    useApproximateDate: Yup.string().required(),
  });
};

function formatDateToPost(date: Date | undefined) {
  return date ? moment(date).format('YYYY-MM-DD') : null;
}

CovidTestDateQuestion.createDTO = (formData: ICovidTestDateData): Partial<CovidTest> => {
  return {
    date_taken_between_end: formatDateToPost(formData.dateTakenBetweenEnd),
    date_taken_between_start: formatDateToPost(formData.dateTakenBetweenStart),
    date_taken_specific: formatDateToPost(formData.dateTakenSpecific),
  } as Partial<CovidTest>;
};
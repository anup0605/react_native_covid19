import ProgressStatus from '@covid/components/ProgressStatus';
import { HeaderText, RegularText } from '@covid/components/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  currentStep: number;
  description?: string;
  maxSteps: number;
  title: string;
}

export function ProgressHeader(props: IProps) {
  return (
    <>
      <HeaderText style={styles.marginBottom}>{props.title}</HeaderText>

      {props.description ? <RegularText style={styles.marginBottom}>{props.description}</RegularText> : null}

      <ProgressStatus currentStep={props.currentStep} maxSteps={props.maxSteps} />
    </>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

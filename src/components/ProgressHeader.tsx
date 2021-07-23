import ProgressStatus from '@covid/components/ProgressStatus';
import { HeaderText } from '@covid/components/Text';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface IProps {
  maxSteps: number;
  step: number;
  title: string;
}

export function ProgressHeader(props: IProps) {
  return (
    <>
      <HeaderText style={styles.marginBottom}>{props.title}</HeaderText>

      <ProgressStatus maxSteps={props.maxSteps} step={props.step} />
    </>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 16,
  },
});

import ProgressStatus from '@covid/components/ProgressStatus';
import { HeaderText, RegularText } from '@covid/components/Text';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  currentStep: number;
  description?: string;
  maxSteps: number;
  style?: StyleProp<ViewStyle>;
  title: string;
}

export function ProgressHeader(props: IProps) {
  return (
    <View style={props.style}>
      <HeaderText style={styles.marginBottom}>{props.title}</HeaderText>

      {props.description ? <RegularText style={styles.marginBottom}>{props.description}</RegularText> : null}

      <ProgressStatus currentStep={props.currentStep} maxSteps={props.maxSteps} />
    </View>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: sizes.m,
  },
});

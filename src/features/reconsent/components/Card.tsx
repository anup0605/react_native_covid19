import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type TProps = {
  description: string;
  index: number;
  title: string;
};

export function Card(props: TProps) {
  return (
    <View style={props.index === 0 ? styles.firstCard : styles.card}>
      <Text rhythm={8} style={styles.darkBlue} textClass="h4Medium">
        {props.title}
      </Text>
      <Text style={styles.darkBlue} textClass="pLight">
        {props.description}
      </Text>
    </View>
  );
}

const cardStyle: ViewStyle = {
  backgroundColor: colors.transparentDarkBlue,
  borderRadius: grid.l,
  paddingHorizontal: grid.xxl,
  paddingVertical: grid.xxl,
};

const styles = StyleSheet.create({
  card: {
    ...cardStyle,
    marginTop: grid.l,
  },
  darkBlue: {
    color: colors.darkblue,
  },
  firstCard: cardStyle,
});

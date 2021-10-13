import InfoCircle from '@assets/icons/InfoCircle';
import { Text } from '@covid/components';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
  text: string;
}

export default function InfoBox(props: IProps) {
  return (
    <View style={[styles.card, props.style]}>
      <View style={styles.icon}>
        <InfoCircle color={colors.darkblue} />
      </View>
      <Text style={styles.text} textClass="pLight">
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBlueBackground,
    borderRadius: sizes.m,
    flexDirection: 'row',
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.s,
  },
  icon: {
    marginTop: sizes.xxs,
  },
  text: {
    color: colors.darkblue,
    justifyContent: 'flex-start',
    marginLeft: sizes.xs,
    paddingRight: sizes.m,
  },
});

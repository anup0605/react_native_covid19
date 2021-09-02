import { ArrowDown, ArrowUp } from '@assets';
import { Text } from '@covid/components/typography';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  change: number;
  style?: StyleProp<ViewStyle>;
}

export function DeltaTag(props: IProps) {
  const from = i18n.t('dashboard.trendline-card.delta.from-last-week');

  const { color, icon, text } =
    props.change >= 0
      ? {
          color: styles.up,
          icon: <ArrowUp color={colors.red} />,
          text: `${i18n.t('dashboard.trendline-card.delta.up')} ${props.change}`,
        }
      : {
          color: styles.down,
          icon: <ArrowDown color={colors.green} />,
          text: `${i18n.t('dashboard.trendline-card.delta.down')} ${Math.abs(props.change)}`,
        };

  return (
    <View style={[styles.tag, color, props.style]}>
      <View style={styles.icon}>{icon}</View>
      <Text style={{ color: color.color }} textClass="pSmall">{`${text} ${from}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  down: {
    borderColor: colors.green,
    color: colors.green,
  },
  icon: {
    marginRight: sizes.xs,
    marginTop: sizes.xxs,
  },
  muted: {
    fontSize: 14,
    paddingTop: 2,
  },
  none: {
    borderColor: colors.tertiary,
    color: colors.tertiary,
  },
  tag: {
    borderRadius: sizes.xs,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: sizes.xs,
    paddingVertical: sizes.xxs,
  },
  up: {
    borderColor: colors.red,
    color: colors.red,
  },
});

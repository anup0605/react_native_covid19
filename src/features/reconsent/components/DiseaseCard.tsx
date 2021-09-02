import { Text } from '@covid/components';
import { sizes } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  IconComponent?: React.ComponentType<any>;
  description: string;
  onPress: () => void;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  title: string;
}

export default function DiseaseCard(props: IProps) {
  return (
    <View style={[styles.container, styles.shadow, props.selected ? styles.activeCard : null, props.style]}>
      <Pressable
        accessible
        accessibilityLabel={`Select ${props.title}`}
        accessibilityRole="checkbox"
        onPress={props.onPress}
        style={styles.pressable}
        testID={props.testID}
      >
        {props.IconComponent ? (
          <View style={styles.icon}>
            <props.IconComponent color={props.selected ? colors.white : colors.darkblue} />
          </View>
        ) : null}
        <View style={styles.textSection}>
          {props.title ? (
            <Text rhythm={2} style={[styles.name, props.selected ? styles.activeName : null]} textClass="pSmallMedium">
              {props.title}
            </Text>
          ) : null}
          {props.description ? (
            <Text
              style={[styles.description, props.selected ? styles.activeDescription : styles.inactiveDescription]}
              textClass="pLight"
            >
              {props.description}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  activeCard: {
    backgroundColor: colors.darkblue,
  },
  activeDescription: {
    color: colors.white,
  },
  activeName: {
    color: colors.white,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.xs,
  },
  description: {
    minHeight: sizes.xxl,
    paddingRight: sizes.m,
  },
  icon: {
    maxWidth: 40,
    width: 40,
  },
  inactiveDescription: {
    color: colors.secondary,
  },
  name: {
    color: colors.darkblue,
    paddingRight: sizes.m,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: sizes.m,
    paddingVertical: sizes.m,
  },
  shadow: {
    elevation: 4,
    shadowColor: colors.hrColor,
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 2,
    shadowRadius: 10,
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: sizes.m,
    paddingRight: sizes.m,
  },
});

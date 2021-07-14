import { Text } from '@covid/components';
import { grid } from '@covid/themes';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  IconComponent: React.ComponentType<any>;
  description: string;
  initialStateIsActive: boolean;
  onPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  title: string;
}

export default function DiseaseCard(props: IProps) {
  const [active, setActive] = React.useState<boolean>(props.initialStateIsActive);
  const onPress = () => {
    setActive((currentState) => !currentState);
    props.onPressHandler();
  };

  return (
    <View style={[styles.container, styles.shadow, active ? styles.activeCard : null, props.style]}>
      <Pressable
        accessible
        accessibilityLabel={`Select ${props.title}`}
        accessibilityRole="checkbox"
        onPress={onPress}
        style={styles.pressable}
        testID={props.testID}
      >
        <View style={styles.icon}>
          <props.IconComponent color={active ? colors.white : colors.darkblue} />
        </View>
        <View style={styles.textSection}>
          <Text rhythm={2} style={[styles.name, active ? styles.activeName : null]} textClass="pSmallMedium">
            {props.title}
          </Text>
          <Text
            style={[styles.description, active ? styles.activeDescription : styles.inactiveDescription]}
            textClass="pLight"
          >
            {props.description}
          </Text>
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
    borderRadius: grid.s,
  },
  description: {
    minHeight: grid.xxxxl,
    paddingRight: grid.l,
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
    paddingRight: grid.l,
  },
  pressable: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: grid.l,
    paddingVertical: grid.l,
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
    marginLeft: grid.l,
    paddingRight: grid.l,
  },
});

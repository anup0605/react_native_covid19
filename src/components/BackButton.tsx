import NavigatorService from '@covid/NavigatorService';
import { colors } from '@theme';
import { Icon } from 'native-base';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  style?: StyleProp<ViewStyle>;
};

export function BackButton(props: TProps) {
  return (
    <TouchableOpacity onPress={NavigatorService.goBack} style={props.style} testID="button-back-navigation">
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" style={styles.icon} type="Entypo" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: colors.secondary,
    fontSize: 16,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundFour,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
});

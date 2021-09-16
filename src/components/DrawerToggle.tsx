import { menuIcon } from '@assets';
import { TScreenName } from '@covid/core/Coordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { sizes } from '@covid/themes';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

type TProps = {
  navigation: DrawerNavigationProp<TScreenParamList, TScreenName>;
  style?: StyleProp<ImageStyle>;
  testID?: string;
};

export const DrawerToggle: React.FC<TProps> = (props) => (
  <TouchableOpacity
    accessible
    accessibilityLabel="Menu"
    accessibilityRole="button"
    onPress={() => {
      props.navigation.toggleDrawer();
    }}
    testID={props.testID}
  >
    <Image source={menuIcon} style={[styles.menuIcon, props.style]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: 0,
  },
  menuIcon: {
    alignSelf: 'flex-end',
    height: sizes.drawerToggle,
    marginRight: sizes.m,
    tintColor: colors.primary,
    width: sizes.drawerToggle,
  },
});

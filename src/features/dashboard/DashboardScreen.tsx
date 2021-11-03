import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import { TScreenParamList } from '@covid/routes/types';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as React from 'react';

interface IProps {
  navigation: DrawerNavigationProp<TScreenParamList>;
  route: RouteProp<TScreenParamList, 'Dashboard'>;
}

// DashboardScreen is the default UK dashboard screen. We only want to show the tab navigator for the UK version.
export function DashboardScreen({ navigation }: IProps) {
  return <TabNavigator navigation={navigation} />;
}

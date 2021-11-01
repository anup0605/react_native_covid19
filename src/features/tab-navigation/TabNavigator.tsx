import { HomeIcon } from '@assets/icons/navigation/HomeIcon';
import { StudiesIcon } from '@assets/icons/navigation/StudiesIcon';
import { ShareScreen } from '@covid/components';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { StudiesListScreen } from '@covid/features/screens';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import MainNavigator from '@covid/routes';
import { TScreenParamList } from '@covid/routes/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { Dimensions, Platform } from 'react-native';

const Stack = createStackNavigator<TScreenParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const drawerContent = (props: DrawerContentComponentProps) => <DrawerMenu {...props} />;

const drawerStyle = {
  width: Dimensions.get('screen').width,
};

const screenOptions = {
  drawerPosition: 'right',
  drawerStyle,
  swipeEnabled: false,
};

const optionsMainScreen = { headerShown: false };

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={drawerContent} drawerStyle={drawerStyle} screenOptions={screenOptions}>
      <Drawer.Screen component={MainNavigator} name="MainNavigator" options={optionsMainScreen} />
    </Drawer.Navigator>
  );
}

const optionsModal = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }, gestureEnabled: false };
const optionsShareScreen = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } };

function HomeScreen() {
  return (
    <>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen component={DrawerNavigator} name="Main" />
        <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={optionsModal} />
        <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={optionsModal} />
        <Stack.Screen component={ShareScreen} name="Share" options={optionsShareScreen} />
      </Stack.Navigator>
    </>
  );
}

const tabNavigatorScreenOptions = {
  headerShown: false,
  tabBarStyle: { position: 'absolute', zIndex: 0 }, // to show screen under tab bar
};

const tabNavigatorScreenOptionsAndroidOnly = {
  tabBarIconStyle: { marginBottom: 10 },
  tabBarStyle: { height: 57, paddingBottom: 10, paddingTop: 10 },
};
const tabHomeScreenOptions = {
  tabBarAccessibilityLabel: 'Home tab',
  tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => <HomeIcon color={focused ? null : color} />,
  tabBarTestID: 'tab-home',
};
const tabStudiesScreenOptions = {
  tabBarAccessibilityLabel: 'Studies tab',
  tabBarBadge: 3,
  // TODO: replace with Redux state var
  tabBarBadgeStyle: { backgroundColor: colors.purple },
  tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
    <StudiesIcon color={focused ? null : color} />
  ),
  tabBarTestID: 'tab-studies',
};

const tabScreenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.quinary,
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...tabNavigatorScreenOptions,
        ...(Platform.OS === 'android' ? tabNavigatorScreenOptionsAndroidOnly : null),
      }}
    >
      <Tab.Screen component={HomeScreen} name="Home" options={{ ...tabScreenOptions, ...tabHomeScreenOptions }} />
      <Tab.Screen
        component={StudiesListScreen}
        name="Studies"
        options={{ ...tabScreenOptions, ...tabStudiesScreenOptions }}
      />
    </Tab.Navigator>
  );
}

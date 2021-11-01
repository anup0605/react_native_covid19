import { HomeIcon } from '@assets/icons/navigation/HomeIcon';
import { StudiesIcon } from '@assets/icons/navigation/StudiesIcon';
import { ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { StudiesListScreen } from '@covid/features/screens';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import MainNavigator from '@covid/routes';
import { TScreenParamList } from '@covid/routes/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@theme';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

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
  tabBarStyle: { position: 'absolute' }, // to show screen under tab bar
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

export function TabNavigator() {
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

export default function CovidApp() {
  const app = useSelector(appSelectors.selectApp);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  const ref = React.useCallback((navigatorRef) => {
    if (navigatorRef) {
      NavigatorService.setContainer(navigatorRef);
    }
  }, []);

  return (
    <Root>
      <MentalHealthPlaybackModal
        onRequestClose={() => dispatch(appActions.setModalMentalHealthPlaybackVisible(false))}
        visible={app.modalMentalHealthPlaybackVisible}
      />
      <NavigationContainer linking={linking} onStateChange={NavigatorService.handleStateChange} ref={ref}>
        <TabNavigator />
      </NavigationContainer>
    </Root>
  );
}

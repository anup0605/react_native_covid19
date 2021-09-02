import { ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { VaccineListMissingModal } from '@covid/features/vaccines/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import MainNavigator from '@covid/routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import * as React from 'react';
import { Dimensions, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator<TScreenParamList>();
const Drawer = createDrawerNavigator();

function DrawNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      drawerStyle={{
        width: Dimensions.get('screen').width,
      }}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen component={MainNavigator} name="Main" options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

const modalOptions = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }, gestureEnabled: false };

export default function CovidApp() {
  const app = useSelector(appSelectors.selectApp);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  // This ignores warnings that pop up wherever we nest FlatList within a ScrollView.
  // The issue is that our custom Screen component (which wraps all our screens) contains a ScrollView.
  // https://stackoverflow.com/questions/58243680/react-native-another-virtualizedlist-backed-container/58283632
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <Root>
      <MentalHealthPlaybackModal
        onRequestClose={() => dispatch(appActions.setModalMentalHealthPlaybackVisible(false))}
        visible={app.modalMentalHealthPlaybackVisible}
      />
      <NavigationContainer
        linking={linking}
        onStateChange={NavigatorService.handleStateChange}
        ref={(navigatorRef) => {
          NavigatorService.setContainer(navigatorRef);
        }}
      >
        <Stack.Navigator headerMode="none" initialRouteName="Main" mode="modal">
          <Stack.Screen component={DrawNavigator} name="Main" />
          <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={modalOptions} />
          <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={modalOptions} />
          <Stack.Screen
            component={ShareScreen}
            name="Share"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

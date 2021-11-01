import { HomeIcon } from '@assets/icons/navigation/HomeIcon';
import { StudiesIcon } from '@assets/icons/navigation/StudiesIcon';
import { ShareScreen, Text } from '@covid/components';
import { TRootState } from '@covid/core/state/root';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { StudiesListScreen } from '@covid/features/screens';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import i18n from '@covid/locale/i18n';
import MainNavigator from '@covid/routes';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

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

const tabScreenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.quinary,
};

export default function TabNavigator() {
  const windowDimensions = useWindowDimensions();
  const ratio = 3 / 4;
  const safeAreaInsets = useSafeAreaInsets();
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(
    // !startupInfo?.tab_navigation_onboarding_seen, // TODO: backend and frontend
    true,
  );
  // const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  const closeOnboarding = React.useCallback(async () => {
    setShowOnboarding(false);
    // dispatch(updateTabNavigationOnboardingSeen(true));
    // await patientService.updatePatientInfo(patientId, {
    //   tab_navigation_onboarding_seen: true,
    // });
    // dispatch(fetchStartUpInfo());
  }, [patientId]);

  const tabNavigatorScreenOptions = {
    headerShown: false,
    tabBarStyle: { position: 'absolute' }, // to show screen under tab bar
  };

  const tabNavigatorScreenOptionsAndroidOnly = {
    tabBarIconStyle: { marginBottom: 10 },
    tabBarStyle: { height: 57, paddingBottom: 10, paddingTop: 10 }, // TODO: cleanup magic numbers
  };
  const tabHomeScreenOptions = {
    tabBarAccessibilityLabel: `${i18n.t('tab-navigation.home-tab')} tab`,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return showOnboarding ? <HomeIcon color={colors.quinary} /> : <HomeIcon color={focused ? null : color} />;
    },
    // We can delete tabBarLabel if there's no onboarding concept because bottom tabs navigator takes care of label and styling for us.
    // Onboarding overlay requires us to overwrite default behaviour, since we're highlighting the tab that is not the active tab.
    tabBarLabel: ({ color }: { color: string }) => {
      return showOnboarding ? (
        <Text style={[fontStyles.bodyXXSmall]}>{i18n.t('tab-navigation.home-tab')}</Text>
      ) : (
        <Text style={[fontStyles.bodyXXSmall, { color }]}>{i18n.t('tab-navigation.home-tab')}</Text>
      );
    },
    tabBarTestID: 'tab-home',
  };

  const tabStudiesScreenOptions = {
    tabBarAccessibilityLabel: `${i18n.t('tab-navigation.studies-tab')} tab`,
    tabBarBadge: 3, // TODO: replace with Redux state var
    tabBarBadgeStyle: { backgroundColor: colors.purple },
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return (
        <>
          {showOnboarding ? (
            <Pressable
              onPress={closeOnboarding}
              style={[
                styles.quarterCircle,
                {
                  borderRadius: windowDimensions.width * ratio,
                  bottom: -1 * ratio * windowDimensions.width - safeAreaInsets.bottom,
                  height: windowDimensions.width * ratio * 2,
                  right: -1 * ratio * windowDimensions.width,
                  width: windowDimensions.width * ratio * 2,
                },
              ]}
            />
          ) : null}
          {showOnboarding ? (
            <Pressable
              onPress={closeOnboarding}
              style={[
                styles.tabIconWrapperActive,
                {
                  height: 150, // TODO: make dynamic
                  width: windowDimensions.width / (5 / 2),
                },
              ]}
            >
              <Text inverted colorPalette="ui" colorShade="lighter" style={styles.flex} textClass="pSmall">
                {i18n.t('tab-navigation.studies-tab-overlay.description')}
              </Text>
              <View style={styles.tabIconOverlay} />
              <StudiesIcon testID="studies-tab-icon" />
            </Pressable>
          ) : (
            <StudiesIcon color={focused ? null : color} testID="studies-tab-icon" />
          )}
        </>
      );
    },
    // We can delete tabBarLabel if there's no onboarding concept because bottom tabs navigator takes care of label and styling for us.
    // Onboarding overlay requires us to overwrite default behaviour, since we're highlighting the tab that is not the active tab.
    tabBarLabel: ({ color }: { color: string }) => {
      return showOnboarding ? (
        <Text style={[fontStyles.bodyXXSmall, { color: colors.accent }]}>{i18n.t('tab-navigation.studies-tab')}</Text>
      ) : (
        <Text style={[fontStyles.bodyXXSmall, { color }]}>{i18n.t('tab-navigation.studies-tab')}</Text>
      );
    },
    tabBarTestID: 'tab-studies',
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={showOnboarding ? styles.overlay : null}
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

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  // probably need to do this within the Screen level?
  overlay: {
    // backgroundColor: 'black',
    // bottom: 0,
    // left: 0,
    opacity: 0.5,
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // zIndex: 100,
  },

  quarterCircle: {
    aspectRatio: 1,
    backgroundColor: colors.black,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 100,
  },
  tabIconOverlay: {
    backgroundColor: colors.white,
    borderColor: colors.tertiary,
    borderRadius: sizes.tabIconOverlay / 2,
    borderWidth: 7,
    height: sizes.tabIconOverlay,
    position: 'absolute',
    right: 37, // TODO: make dynamic
    top: 110, // TODO: make dynamic
    width: sizes.tabIconOverlay,
    zIndex: 0,
  },
  tabIconWrapperActive: {
    alignItems: 'center',
    bottom: 7, // TODO: make dynamic
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 20, // TODO: make dynamic
    zIndex: 999,
  },
});

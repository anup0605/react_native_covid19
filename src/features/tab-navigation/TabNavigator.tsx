import { HomeIcon } from '@assets/icons/navigation/HomeIcon';
import { StudiesIcon } from '@assets/icons/navigation/StudiesIcon';
import { Text } from '@covid/components';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { DashboardUKScreen } from '@covid/features/dashboard/DashboardUKScreen';
import { StudiesListScreen } from '@covid/features/screens';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const tabScreenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.quinary,
};

export default function TabNavigator() {
  const windowDimensions = useWindowDimensions();
  const ratio = 3 / 4;
  const safeAreaInsets = useSafeAreaInsets();
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(false);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  React.useEffect(() => {
    setTimeout(() => {
      if (startupInfo?.menu_notifications_onboarding_seen) {
        setShowOnboarding(true);
      }
    }, 1500);
  }, [startupInfo?.menu_notifications_onboarding_seen]);

  const closeOnboarding = React.useCallback(async () => {
    setShowOnboarding(false);
  }, []);

  const tabNavigatorScreenOptions = {
    headerShown: false,
    tabBarStyle: { position: 'absolute' }, // Needed to show screen under tab bar
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
              <StudiesIcon style={{ zIndex: 1 }} testID="studies-tab-icon" />
              <View style={styles.tabIconOverlay} />
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
      <Tab.Screen
        component={DashboardUKScreen}
        name="Home"
        options={{ ...tabScreenOptions, ...tabHomeScreenOptions }}
      />
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

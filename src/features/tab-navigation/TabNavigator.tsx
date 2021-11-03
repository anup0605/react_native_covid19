import { HomeIcon } from '@assets/icons/navigation/HomeIcon';
import { StudiesIcon } from '@assets/icons/navigation/StudiesIcon';
import { Text } from '@covid/components';
import { events, track } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartUpInfo, updateStudiesTabOnboardingSeen } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { DashboardUKScreen } from '@covid/features/dashboard/DashboardUKScreen';
import { StudiesListScreen } from '@covid/features/studies-hub/screens/StudiesListScreen';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const tabScreenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.quinary,
};

const tabNavigatorScreenOptions = {
  headerShown: false,
  tabBarStyle: { position: 'absolute' }, // Needed to show screen under tab bar
};

const tabNavigatorScreenOptionsAndroidOnly = {
  tabBarIconStyle: { marginBottom: 10 },
  tabBarStyle: { height: 57, paddingBottom: sizes.s, paddingTop: sizes.s },
};

export default function TabNavigator() {
  const ratio = 3 / 4;
  const windowDimensions = useWindowDimensions();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(false);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  React.useEffect(() => {
    setTimeout(() => {
      if (startupInfo?.menu_notifications_onboarding_seen && !startupInfo?.studies_tab_onboarding_seen) {
        setShowOnboarding(true);
        track(events.STUDIES_HUB_OVERLAY_SHOWN);
      }
    }, 1500);
  }, [startupInfo?.menu_notifications_onboarding_seen, startupInfo?.studies_tab_onboarding_seen]);

  const closeOnboarding = React.useCallback(async () => {
    setShowOnboarding(false);
    dispatch(updateStudiesTabOnboardingSeen(true));
    await patientService.updatePatientInfo(patientId, {
      studies_tab_onboarding_seen: true,
    });
    dispatch(fetchStartUpInfo());
  }, [patientId]);

  const tabHomeScreenOptions = {
    tabBarAccessibilityLabel: `${i18n.t('tab-navigation.home-tab')} tab`,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return showOnboarding ? <HomeIcon color={colors.quinary} /> : <HomeIcon color={focused ? null : color} />;
    },
    // We can delete tabBarLabel option if there's no onboarding overlay. Overlay requires us to overwrite default behaviour.
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
    tabBarBadgeStyle: {
      backgroundColor: colors.purple,
      elevation: 1,
      top: Platform.OS === 'android' ? -10 : 5,
      zIndex: 1,
    },
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return (
        <>
          {/* TODO: Can we refactor overlay into its own component? */}
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
                  bottom: Platform.OS === 'android' ? -4 : 7.5,
                  height: windowDimensions.width / 2.25,
                  right: windowDimensions.width / 18 - 2,
                  width: windowDimensions.width / 2.5,
                },
              ]}
            >
              <View
                style={[styles.tabIconOverlay, { top: (windowDimensions.width * ratio - sizes.tabIconOverlay) / 1.65 }]}
              />
              <Text
                inverted
                colorPalette="ui"
                colorShade="lighter"
                style={styles.flex}
                testID="studies-tab-overlay-description"
                textClass="pSmall"
              >
                {i18n.t('tab-navigation.studies-tab-overlay.description')}
              </Text>
              <StudiesIcon testID="studies-tab-icon" />
            </Pressable>
          ) : (
            <StudiesIcon color={focused ? null : color} testID="studies-tab-icon" />
          )}
        </>
      );
    },
    tabBarLabel: ({ color }: { color: string }) => {
      return showOnboarding ? (
        <Text style={[fontStyles.bodyXXSmall, { color: colors.accent, elevation: 1, zIndex: 1 }]}>
          {i18n.t('tab-navigation.studies-tab')}
        </Text>
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
  overlay: {
    // backgroundColor: 'black', // Doesn't take effect. Probably need to do this within the Screen level?
    opacity: 0.5,
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
    elevation: 0,
    height: sizes.tabIconOverlay,
    position: 'absolute',
    width: sizes.tabIconOverlay,
    zIndex: 0,
  },
  tabIconWrapperActive: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 999,
  },
});

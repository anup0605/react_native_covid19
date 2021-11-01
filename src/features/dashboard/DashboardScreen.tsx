import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import * as React from 'react';

// DashboardScreen is the default UK dashboard screen. We only want to show the tab navigator for the UK version.
export function DashboardScreen() {
  return <TabNavigator />;
}

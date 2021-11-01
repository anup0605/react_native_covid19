import Analytics, { events } from '@covid/core/Analytics';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import NavigatorService from '@covid/NavigatorService';
import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TabNavigator from './features/tab-navigation/TabNavigator';

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

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

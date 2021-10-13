import { Menu } from '@assets/icons/Menu';
import { WithNotificationDot } from '@covid/components/WithNotificationDot';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

type TProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export const DrawerToggle: React.FC<TProps> = React.memo((props) => {
  const startupInfo = useSelector(selectStartupInfo);
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Menu"
      accessibilityRole="button"
      hitSlop={hitSlop}
      onPress={props.onPress}
      style={props.style}
      testID={props.testID}
    >
      <WithNotificationDot showDot={!!startupInfo?.active_notifications?.notifications_wider_health_studies}>
        <Menu height={sizes.drawerToggle} width={sizes.drawerToggle} />
      </WithNotificationDot>
    </TouchableOpacity>
  );
});

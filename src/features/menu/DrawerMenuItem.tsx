import { NumberIndicator } from '@covid/components/stats/NumberIndicator';
import { CaptionText, HeaderText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export enum EDrawerMenuItem {
  RESEARCH_UPDATE = 'RESEARCH_UPDATE',
  TURN_ON_REMINDERS = 'TURN_ON_REMINDERS',
  FAQ = 'FAQ',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  DELETE_MY_DATA = 'DELETE_MY_DATA',
  LOGOUT = 'LOGOUT',
}

interface IMenuItemProps {
  image?: React.ReactNode;
  indicator?: number;
  label: string;
  onPress: () => void;
  smallLabel?: string;
  testID?: string;
}

interface ILinkMenuItemProps {
  link?: string;
  type: EDrawerMenuItem;
  onPress?: () => void;
}

export function MenuItem(props: IMenuItemProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.iconNameRow} testID={props.testID}>
      <View style={{ flexDirection: 'row' }}>
        {props.image ? <View style={styles.icon}>{props.image}</View> : null}
        <View style={styles.labelRow}>
          <HeaderText>{props.label}</HeaderText>
          {props.indicator ? <NumberIndicator number={props.indicator} /> : null}
        </View>
      </View>
      {props.smallLabel != null ? <CaptionText style={styles.smallLabel}>{props.smallLabel}</CaptionText> : null}
    </TouchableOpacity>
  );
}

export function LinkItem({
  link,
  type,
  onPress = () => {
    Analytics.track(events.CLICK_DRAWER_MENU_ITEM, { name: type });
    if (link) openWebLink(link);
  },
}: ILinkMenuItemProps) {
  const getLabel = (): string => {
    switch (type) {
      case EDrawerMenuItem.FAQ:
        return i18n.t('faqs');
      case EDrawerMenuItem.RESEARCH_UPDATE:
        return i18n.t('research-updates');
      case EDrawerMenuItem.PRIVACY_POLICY:
        return i18n.t('privacy-policy');
      case EDrawerMenuItem.DELETE_MY_DATA:
        return i18n.t('delete-my-data');
      case EDrawerMenuItem.TURN_ON_REMINDERS:
        return i18n.t('push-notifications');
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconNameRow}>
      <View style={styles.labelRow}>
        <RegularText>{getLabel()}</RegularText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: sizes.l,
    width: 24,
  },
  iconNameRow: {
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: sizes.xs,
    marginVertical: sizes.m,
  },
  labelRow: {
    justifyContent: 'space-between',
  },
  smallLabel: {
    marginTop: sizes.xs,
  },
});

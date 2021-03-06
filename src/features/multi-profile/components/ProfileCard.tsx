import { ClippedText, SecondaryText } from '@covid/components/Text';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { TProfile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { getAvatarByName, TAvatarName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import { colors } from '@theme';
import { Card } from 'native-base';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { GreenTick } from './GreenTick';
import LastReported from './LastReported';

type TProps = {
  index: number;
  profile: TProfile;
  onEditPressed?: VoidFunction;
  testID?: string;
};

export function ProfileCard(props: TProps) {
  const avatarImage = getAvatarByName(props.profile.avatar_name as TAvatarName);
  const hasReportedToday = props.profile.last_reported_at && getDaysAgo(props.profile.last_reported_at) === 0;
  const profileName = isSECountry() && props.index === 0 ? 'Jag' : props.profile.name;

  return (
    <Card transparent style={styles.card} testID={props.testID}>
      <View style={styles.avatarContainer}>
        {hasReportedToday ? <GreenTick /> : null}
        <Image resizeMode="contain" source={avatarImage} style={styles.avatar} />
      </View>
      <ClippedText>{profileName}</ClippedText>
      <LastReported timeAgo={props.profile.last_reported_at} />
      {props.onEditPressed ? (
        <TouchableOpacity onPress={props.onEditPressed}>
          <SecondaryText style={styles.secondaryText}>{i18n.t('menu.item-edit-profile')}</SecondaryText>
        </TouchableOpacity>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 100,
    width: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: sizes.s,
    marginTop: sizes.l,
    width: 100,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.m,
    marginBottom: 0,
    marginTop: 0,
    minHeight: 224,
    paddingVertical: sizes.s,
    shadowRadius: 0,
    width: '100%',
  },
  secondaryText: {
    color: colors.accent,
    fontSize: 12,
    textAlign: 'center',
  },
});

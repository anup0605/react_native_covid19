import { NavHeader } from '@covid/components/NavHeader';
import { ClippedText, RegularText } from '@covid/components/Text';
import Triangle from '@covid/components/Triangle';
import { TProfile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { getAvatarByName, TAvatarName } from '@covid/utils/avatar';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type TProps = {
  profile: TProfile;
  simpleCallout?: boolean;
  calloutTitle?: string;
};

export function PatientHeader(props: TProps) {
  const text = !props.profile.reported_by_another
    ? props.profile.name
    : i18n.t('answer-for', { name: props.profile.name });

  const avatarImage = getAvatarByName(props.profile.avatar_name as TAvatarName);

  const avatarComponent = (
    <View style={styles.view}>
      {!props.profile.reported_by_another || props.simpleCallout ? (
        <RegularText style={styles.textRegular}>{text}</RegularText>
      ) : (
        <>
          <View style={styles.textWrapper}>
            <ClippedText style={styles.textClipped}>{text}</ClippedText>
          </View>
          <Triangle color={colors.coral} direction="right" height={14} style={styles.triangle} width={8} />
        </>
      )}
      {avatarImage ? <Image source={avatarImage} style={styles.avatar} /> : null}
    </View>
  );

  return <NavHeader rightElement={avatarComponent} />;
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: sizes.m,
    height: sizes.m * 2,
    marginLeft: sizes.xxs,
    width: sizes.m * 2,
  },
  textClipped: {
    color: colors.white,
  },
  textRegular: {
    alignSelf: 'center',
  },
  textWrapper: {
    backgroundColor: colors.coral,
    borderRadius: sizes.s,
    justifyContent: 'center',
    paddingHorizontal: sizes.s,
    paddingVertical: sizes.xxs,
  },
  triangle: {
    marginLeft: -2,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

import { TProfile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { getAvatarByName, TAvatarName } from '@covid/utils/avatar';
import { colors } from '@theme';
import { Icon } from 'native-base';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ClippedText, RegularText } from './Text';

type TBackButtonProps = {
  showCloseButton?: boolean;
  style?: StyleProp<ViewStyle>;
};

export enum ECallOutType {
  Simple,
  Tag,
}

export const BackButton: React.FC<TBackButtonProps> = ({ style: containerStyle, showCloseButton }) => {
  return showCloseButton ? (
    <TouchableOpacity onPress={NavigatorService.goBack} style={containerStyle} testID="button-back-navigation">
      <View style={styles.iconButton}>
        <Icon name="cross" style={styles.icon} type="Entypo" />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={NavigatorService.goBack} style={containerStyle} testID="button-back-navigation">
      <View style={styles.iconButton}>
        <Icon name="chevron-thin-left" style={styles.icon} type="Entypo" />
      </View>
    </TouchableOpacity>
  );
};

type TPatientHeaderProps = {
  profile: TProfile;
  simpleCallout?: boolean;
  type?: ECallOutType;
  calloutTitle?: string;
  showCloseButton?: boolean;
};

type TNavHeaderProps = {
  rightComponent?: React.ReactNode;
  showCloseButton?: boolean;
};

export const NavHeader: React.FC<TNavHeaderProps> = ({ rightComponent, showCloseButton }) => {
  return (
    <View style={styles.headerBar}>
      <View style={styles.left}>
        <BackButton showCloseButton={showCloseButton} />
      </View>
      <View style={styles.center} />
      <View style={styles.right}>{rightComponent}</View>
    </View>
  );
};

export function PatientHeader({
  profile,
  simpleCallout = false,
  type = !profile.reported_by_another ? ECallOutType.Simple : ECallOutType.Tag,
  calloutTitle = !profile.reported_by_another ? profile.name : i18n.t('answer-for', { name: profile.name }),
  showCloseButton = false,
}: TPatientHeaderProps) {
  const avatarImage = getAvatarByName(profile.avatar_name as TAvatarName);
  const avatarComponent = (
    <>
      {type === ECallOutType.Simple || simpleCallout ? (
        <View style={styles.regularTextBox}>
          <RegularText style={styles.regularText}>{calloutTitle}</RegularText>
        </View>
      ) : (
        <>
          <View style={styles.altTextBox}>
            <ClippedText style={styles.altText}>{calloutTitle}</ClippedText>
            <View style={styles.rightTriangle} />
          </View>
        </>
      )}
      {!!avatarImage && <Image source={avatarImage} style={styles.avatar} />}
    </>
  );

  return <NavHeader rightComponent={avatarComponent} showCloseButton={showCloseButton} />;
}

const styles = StyleSheet.create({
  altText: {
    color: colors.white,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  altTextBox: {
    backgroundColor: colors.coral,
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 10,
    maxWidth: 200,
  },
  avatar: {
    borderRadius: 16,
    height: 32,
    marginHorizontal: 8,
    marginVertical: 16,
    width: 32,
  },
  center: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingHorizontal: 16,
  },
  icon: {
    color: colors.secondary,
    fontSize: 16,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.backgroundFour,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginHorizontal: 8,
    marginVertical: 16,
    width: 32,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  regularText: {},
  regularTextBox: {
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightTriangle: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 8,
    borderLeftColor: colors.coral,
    borderLeftWidth: 8,
    borderRightColor: 'transparent',
    borderRightWidth: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 8,
    position: 'absolute',
    right: -8,
  },
});

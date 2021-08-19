import { chevronRight } from '@assets';
import { Screen } from '@covid/components/Screen';
import { Header3Text, HeaderText, SecondaryText } from '@covid/components/Text';
import { ArchiveProfile } from '@covid/features/multi-profile/ArchiveProfile';
import { editProfileCoordinator } from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type TLinkItemProps = {
  onPress: VoidFunction;
  title: string;
};

function LinkItem(props: TLinkItemProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.profileLabel}>
      <Header3Text>{props.title}</Header3Text>
      <Image source={chevronRight} style={styles.chevron} />
    </TouchableOpacity>
  );
}

type TProps = {
  route: RouteProp<TScreenParamList, 'EditProfile'>;
};

export const EditProfileScreen: React.FC<TProps> = (props) => {
  function renderFooter() {
    return <ArchiveProfile patientId={props.route.params?.patientData?.patientId} style={styles.margin} />;
  }
  return (
    <Screen
      simpleCallout
      profile={props.route.params?.patientData?.profile}
      renderFooter={props.route.params?.patientData?.profile?.reported_by_another ? renderFooter : undefined}
      testID="edit-profile-screen"
    >
      <HeaderText style={{ marginBottom: 12 }}>{i18n.t('edit-profile.title')}</HeaderText>
      <SecondaryText>{i18n.t('edit-profile.text')}</SecondaryText>

      <LinkItem onPress={editProfileCoordinator.goToEditLocation} title={i18n.t('edit-profile.your-location')} />

      {editProfileCoordinator.shouldShowEditStudy() ? (
        <LinkItem onPress={editProfileCoordinator.goToEditYourStudy} title={i18n.t('your-study.title')} />
      ) : null}

      {editProfileCoordinator.shouldShowSchoolNetwork() ? (
        <LinkItem onPress={editProfileCoordinator.goToSchoolNetwork} title="School network" />
      ) : null}

      {editProfileCoordinator.shouldShowUniNetwork() ? (
        <LinkItem onPress={editProfileCoordinator.goToUniversityNetwork} title="University network" />
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  chevron: {
    height: 16,
    width: 16,
  },
  margin: {
    margin: 32,
  },
  profileLabel: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
});

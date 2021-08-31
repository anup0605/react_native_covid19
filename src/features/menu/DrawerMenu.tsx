import { closeIcon } from '@assets';
import EditProfilesIcon from '@assets/icons/navigation/EditProfilesIcon';
import ShareIcon from '@assets/icons/navigation/ShareIcon';
import { share } from '@covid/components/cards/BaseShareApp';
import { CaptionText } from '@covid/components/Text';
import { selectUser } from '@covid/core/state/user';
import { MenuItem } from '@covid/features/menu/DrawerMenuItem';
import { LinksSection } from '@covid/features/menu/LinksSection';
import { useLogout } from '@covid/features/menu/useLogout';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import Constants from '@covid/utils/Constants';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const isDevChannel = () => {
  return Constants.manifest.releaseChannel === '0-dev';
};

export const DrawerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  const user = useSelector(selectUser);

  const logout = useLogout(props.navigation);

  return (
    <SafeAreaView style={styles.drawerRoot}>
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <CaptionText>
            {`Version `}
            {Constants.manifest.revisionId ? Constants.manifest.revisionId : Constants.manifest.version}
            {isDevChannel() ? ` (DEV)` : false}
          </CaptionText>
          <TouchableOpacity onPress={props.navigation.goBack}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>

        <MenuItem
          image={<EditProfilesIcon />}
          label={i18n.t('nav-edit-profile')}
          onPress={() => {
            NavigatorService.navigate('SelectProfile', { assessmentFlow: false });
          }}
          testID="menu-item-edit-profile"
        />

        <MenuItem
          image={<ShareIcon />}
          label={i18n.t('nav-share-this-app')}
          onPress={() => {
            const shareMessage = i18n.t('share-this-app.message');
            share(shareMessage);
          }}
          testID="menu-item-share"
        />

        <LinksSection navigation={props.navigation} />

        <View style={{ marginBottom: sizes.l, paddingBottom: sizes.l }}>
          <MenuItem label={i18n.t('logout')} onPress={logout} smallLabel={user.username} testID="menu-item-logout" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
  },
  container: {
    flex: 1,
    padding: sizes.l,
  },
  drawerIcon: {
    height: 24,
    marginRight: sizes.m,
    width: 24,
  },
  drawerRoot: {
    flex: 1,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: sizes.l,
    paddingLeft: sizes.xs,
  },
});

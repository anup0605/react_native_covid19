import { HeaderText } from '@covid/components/Text';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { ArchiveConfirmationModal } from '@covid/features/multi-profile/ArchiveConfirmationModal';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  patientId: string;
  style?: StyleProp<ViewStyle>;
};

export const ArchiveProfile: React.FC<TProps> = (props) => {
  const [isConfirmModalVisible, setConfirmModalVisibility] = React.useState(false);

  function clickArchive() {
    setConfirmModalVisibility(true);
  }

  function cancelArchive() {
    setConfirmModalVisibility(false);
  }

  function confirmArchive() {
    setConfirmModalVisibility(false);
    appCoordinator.goToArchiveReason(props.patientId);
  }

  return (
    <View style={props.style}>
      {isConfirmModalVisible ? (
        <ArchiveConfirmationModal cancelArchive={cancelArchive} confirmArchive={confirmArchive} />
      ) : null}

      <TouchableOpacity onPress={clickArchive}>
        <HeaderText style={styles.archiveCta}>{i18n.t('edit-profile.archive-cta')}</HeaderText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  archiveCta: {
    color: colors.coral,
    textAlign: 'center',
  },
});

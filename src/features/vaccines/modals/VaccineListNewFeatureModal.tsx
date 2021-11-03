import { BrandedButton, HeaderText, LightText, Modal } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

export function VaccineListNewFeatureModal(props: TProps) {
  return (
    <Modal
      enableBackdropDismiss
      modalName="VaccineListNewFeature"
      onRequestClose={props.onRequestClose}
      testID="vaccine-list-new-feature-modal"
      visible={props.visible}
    >
      <View style={styles.modalWrapper}>
        <HeaderText style={styles.modalTitle}>{i18n.t('vaccines.vaccine-list.modal-title')}</HeaderText>
        <LightText style={styles.modalBody}>{i18n.t('vaccines.vaccine-list.modal-body')}</LightText>
        <BrandedButton onPress={props.onRequestClose}>{i18n.t('vaccines.vaccine-list.modal-button')}</BrandedButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBody: {
    marginBottom: sizes.xl,
  },
  modalTitle: {
    marginBottom: sizes.l,
    textAlign: 'center',
  },
  modalWrapper: {
    padding: sizes.xxs,
    paddingBottom: sizes.xs,
  },
});

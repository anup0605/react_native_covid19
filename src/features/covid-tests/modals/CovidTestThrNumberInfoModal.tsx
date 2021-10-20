import { thrNumberInstructions } from '@assets';
import { BrandedButton, HeaderText, LightText, Modal } from '@covid/components';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

interface IProps {
  onRequestClose: () => void;
  visible: boolean;
}

export const CovidTestThrNumberInfoModal: React.FC<IProps> = (props) => {
  const footerChildren = React.useMemo(
    () => <BrandedButton onPress={props.onRequestClose}>{i18n.t('ok')}</BrandedButton>,
    [props.onRequestClose, i18n.t('ok')],
  );

  return isGBCountry() ? (
    <Modal
      showsVerticalScrollIndicator
      footerChildren={footerChildren}
      onRequestClose={props.onRequestClose}
      testID="covid-test-thr-number-info-modal"
      visible={props.visible}
    >
      <HeaderText style={styles.modalTitle}>{i18n.t('covid-test.thr-number-modal.title')}</HeaderText>
      <Image resizeMode="contain" source={thrNumberInstructions} style={styles.thrImage} />
      <LightText>{i18n.t(`covid-test.thr-number-modal.description`)}</LightText>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: sizes.xl,
    marginTop: sizes.s,
    textAlign: 'center',
  },
  thrImage: {
    marginBottom: sizes.l,
    width: '100%',
  },
});

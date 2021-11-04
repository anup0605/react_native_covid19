import { BrandedButton, Modal, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const sourceImage = require('../assets/modal_illustration.png');

type TProps = {
  onRequestClose: () => void;
  visible: boolean;
};

export function InterestShownModal(props: TProps) {
  return (
    <Modal
      enableBackdropDismiss
      modalName="InterestShown"
      onRequestClose={props.onRequestClose}
      testID="interest-shown-modal"
      visible={props.visible}
    >
      <Image source={sourceImage} style={styles.image} />
      <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Regular">
        {i18n.t('studies-hub.interest-shown-modal.title')}
      </Text>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="dark"
        style={styles.marginVertical}
        textAlign="center"
        textClass="pLight"
      >
        {i18n.t('studies-hub.interest-shown-modal.description')}
      </Text>
      <BrandedButton onPress={props.onRequestClose} style={styles.button}>
        {i18n.t('studies-hub.interest-shown-modal.button')}
      </BrandedButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
  },
  image: {
    height: 94,
    marginBottom: sizes.xs,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 94,
  },
  marginVertical: {
    marginBottom: sizes.l,
    marginTop: sizes.l,
  },
});

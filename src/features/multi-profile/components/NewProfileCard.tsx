import { addProfile } from '@assets';
import { RegularText } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { Card } from 'native-base';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

export const NewProfileCard: React.FC = () => {
  return (
    <Card transparent style={styles.card} testID="button-new-profile">
      <Image resizeMode="contain" source={addProfile} style={styles.addImage} />
      <RegularText>{i18n.t('select-profile-button')}</RegularText>
    </Card>
  );
};

const styles = StyleSheet.create({
  addImage: {
    height: 130,
    marginBottom: sizes.m,
    width: '100%',
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
});

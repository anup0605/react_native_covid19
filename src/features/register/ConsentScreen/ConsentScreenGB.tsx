import { Text } from '@covid/components';
import { LegalCard } from '@covid/components/cards/LegalCard';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'Consent'>;
  route: RouteProp<TScreenParamList, 'Consent'>;
  setAgreed: (agreed: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

const hitSlop = {
  bottom: 20,
  top: 20,
};

export const ConsentScreenGB: React.FC<TProps> = React.memo((props: TProps) => {
  React.useEffect(() => {
    props.setAgreed(true);
  }, []);

  const onPrivacyPolicyPress = () => NavigatorService.navigate('PrivacyPolicyUK');

  const onInformationSheetPress = () => openWebLink('https://covid.joinzoe.com/wider-health-studies-infosheet');

  const renderCards = () => {
    return [1, 2, 3, 4].map((i) => (
      <LegalCard
        description={i18n.t(`consent-normal-uk.card-${i}-description`)}
        index={i - 1}
        key={`legal-card-${i}`}
        title={i18n.t(`consent-normal-uk.card-${i}-title`)}
      />
    ));
  };

  return (
    <View style={props.style}>
      <Text rhythm={24} style={styles.center} textClass="h3Light">
        {i18n.t('consent-normal-uk.title')}
      </Text>
      <Text rhythm={24} style={[styles.center, styles.secondaryColour]} textClass="pLight">
        {i18n.t('consent-normal-uk.subtitle')}
      </Text>
      {renderCards()}
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onPrivacyPolicyPress}
        style={styles.marginTop}
        testID="button-privacy-notice"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.privacy-notice')}{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={onInformationSheetPress}
        style={styles.marginTop}
        testID="button-information-sheet"
      >
        <Text style={styles.externalLink} textClass="pSmallLight">
          {i18n.t('reconsent.request-consent.information-sheet')}{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  externalLink: {
    color: colors.darkblue,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  marginTop: {
    marginTop: sizes.xl,
  },
  secondaryColour: {
    color: colors.secondary,
  },
});

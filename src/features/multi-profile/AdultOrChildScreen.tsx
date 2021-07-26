import Screen, { Header } from '@covid/components/Screen';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText, SecondaryText } from '@covid/components/Text';
import { EConsentType, TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'AdultOrChild'>;
  route: RouteProp<TScreenParamList, 'AdultOrChild'>;
};

export default class AdultOrChildScreen extends React.Component<TProps> {
  buildRouteParams = (consentType: EConsentType) => {
    return {
      avatarName: this.props.route.params?.avatarName,
      consentType,
      profileName: this.props.route.params?.profileName,
    };
  };

  render() {
    return (
      <Screen>
        <Header>
          <HeaderText style={{ marginBottom: 12 }}>{i18n.t('adult-or-child-title')}</HeaderText>
          <SecondaryText>{i18n.t('adult-or-child-text')}</SecondaryText>
        </Header>

        <View style={styles.content}>
          <SelectorButton
            onPress={() => this.props.navigation.navigate('ConsentForOther', this.buildRouteParams(EConsentType.Adult))}
            testID="button-over-18"
            text={i18n.t('person-over-18')}
          />

          <SelectorButton
            onPress={() => this.props.navigation.navigate('ConsentForOther', this.buildRouteParams(EConsentType.Child))}
            testID="button-under-18"
            text={i18n.t('person-under-18')}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 32,
  },
});

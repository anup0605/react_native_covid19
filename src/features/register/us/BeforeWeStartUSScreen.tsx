import { ScreenNew } from '@covid/components/ScreenNew';
import { SelectorButton } from '@covid/components/SelectorButton';
import { HeaderText } from '@covid/components/Text';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { styling } from '@covid/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'BeforeWeStartUS'>;
};

export default function BeforeWeStartUSScreen(props: TProps) {
  return (
    <ScreenNew testID="before-we-start-us-screen">
      <HeaderText style={styling.marginBottomHuge}>{i18n.t('before-we-start.title')}</HeaderText>

      <SelectorButton
        onPress={() => props.navigation.navigate('NursesConsentUS', { viewOnly: false })}
        style={styling.marginBottom}
        text={i18n.t('before-we-start.yes')}
      />
      <SelectorButton
        onPress={() => props.navigation.navigate('Consent', { viewOnly: false })}
        text={i18n.t('before-we-start.no')}
      />
    </ScreenNew>
  );
}

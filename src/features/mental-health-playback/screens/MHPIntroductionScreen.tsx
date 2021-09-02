import Info from '@assets/mental-health-playback/Info';
import Introduction, { defaultWidth as introductionWidth } from '@assets/mental-health-playback/Introduction';
import { Text } from '@covid/components';
import Card from '@covid/components/cards/Card';
import { Screen } from '@covid/components/Screen';
import UL from '@covid/components/UL';
import { requestInsights } from '@covid/core/state/mental-health-playback/slice';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useDispatch } from 'react-redux';

const personalItems = [
  i18n.t('mental-health-playback.introduction.point-personal-1'),
  i18n.t('mental-health-playback.introduction.point-personal-2'),
  i18n.t('mental-health-playback.introduction.point-personal-3'),
];

export default function MHPIntroductionScreen() {
  const dispatch = useDispatch();
  const windowWidth = Math.min(sizes.maxScreenWidth, useWindowDimensions().width);

  React.useEffect(() => {
    dispatch(requestInsights());
  }, []);

  function onPress() {
    NavigatorService.navigate('MentalHealthPlaybackGeneral');
  }

  return (
    <Screen
      noPadding
      backgroundColor={colors.white}
      footerOnPress={onPress}
      footerTitle={i18n.t('mental-health-playback.introduction.button')}
      testID="mhp-introduction-screen"
    >
      <Introduction scale={windowWidth / introductionWidth} />
      <View style={[styling.padding, styling.marginVerticalAuto]}>
        <Card backgroundColor="#F5F9FC" style={styling.marginBottom}>
          <Text style={styling.marginBottom} textClass="h4">
            {i18n.t('mental-health-playback.introduction.title-personal')}
          </Text>
          <UL items={personalItems} />
        </Card>
        <View style={styling.row}>
          <Info style={styling.marginRightSmall} />
          <Text style={styling.flex} textClass="pLight">
            {i18n.t('mental-health-playback.introduction.info')}
          </Text>
        </View>
      </View>
    </Screen>
  );
}

import { BrandedButton, Text } from '@covid/components';
import { BackButton } from '@covid/components/BackButton';
import EmptyState from '@covid/components/EmptyState';
import { Screen } from '@covid/components/Screen';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { isLoading, selectInsights } from '@covid/core/state/mental-health-playback/slice';
import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import Insights from '@covid/features/mental-health-playback/components/Insights';
import PaginationIndicator from '@covid/features/mental-health-playback/components/PaginationIndicator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, sizes, styling } from '@covid/themes';
import * as React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function MHPGeneralScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const mhInsights = useSelector(selectInsights);
  const loading = useSelector(isLoading);

  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>((state) => state.content.startupInfo);
  const scrollViewRef = React.useRef<ScrollView>(null);

  function onPress() {
    if (mhInsights.completed_feedback) {
      NavigatorService.navigate(homeScreenName());
    } else {
      NavigatorService.navigate('MentalHealthPlaybackRating');
    }
  }

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (scrollViewHeight > 0) {
      const index = Math.floor(
        Math.max(0, event?.nativeEvent?.contentOffset.y + scrollViewHeight / 2) / scrollViewHeight,
      );
      if (index !== selectedIndex) {
        setSelectedIndex(index);
      }
    }
  }

  function onSelection(index: number) {
    scrollViewRef?.current?.scrollTo({
      animated: true,
      x: 0,
      y: index * scrollViewHeight,
    });
  }

  const windowDimensions = useWindowDimensions();
  const safeAreaInsets = useSafeAreaInsets();

  const scrollViewHeight = windowDimensions.height - safeAreaInsets.top - safeAreaInsets.bottom;

  return (
    <Screen hideBackButton noPadding noScrollView backgroundColor="white" testID="mhp-general-screen">
      <View style={[styling.flex, styling.relative]}>
        <BackButton style={styles.backButton} />
        {!mhInsights.insights.length && loading ? (
          <EmptyState />
        ) : (
          <>
            <ScrollView
              decelerationRate="fast"
              onScroll={onScroll}
              ref={scrollViewRef}
              scrollEventThrottle={80}
              snapToInterval={scrollViewHeight}
            >
              <Insights insights={mhInsights.insights} itemHeight={scrollViewHeight} />

              <View style={{ height: scrollViewHeight }}>
                <View style={styles.view}>
                  <Text textAlign="center" textClass="h3Regular">
                    {i18n.t('mental-health-playback.general.end-title-personal')}
                  </Text>
                  <Text
                    inverted
                    colorPalette="uiDark"
                    colorShade="dark"
                    style={styling.marginTopBig}
                    textAlign="center"
                    textClass="p"
                  >
                    {i18n.t('mental-health-playback.general.end-description')}
                  </Text>
                </View>
                <BrandedButton onPress={onPress} style={styles.button}>
                  {i18n.t('mental-health-playback.general.end-button')}
                </BrandedButton>
              </View>
            </ScrollView>

            <PaginationIndicator
              amount={mhInsights.insights.length + 1}
              onSelection={onSelection}
              selectedIndex={selectedIndex}
            />
          </>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    left: sizes.screenHorizontalPadding,
    position: 'absolute',
    top: sizes.screenVerticalPadding,
    zIndex: 1,
  },
  button: {
    marginBottom: grid.xl,
    marginHorizontal: grid.xl,
  },
  view: {
    marginBottom: 'auto',
    marginTop: 'auto',
    paddingHorizontal: grid.xxxl,
  },
});

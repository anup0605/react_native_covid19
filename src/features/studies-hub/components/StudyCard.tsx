import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { IconArrowRight } from '@covid/features/studies-hub/components/IconArrowRight';
import { IconHeart } from '@covid/features/studies-hub/components/IconHeart';
import { IconPeople } from '@covid/features/studies-hub/components/IconPeople';
import { IconTime } from '@covid/features/studies-hub/components/IconTime';
import { TStudy } from '@covid/features/studies-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes, styling } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  active?: boolean;
  onPress: () => void;
  study: TStudy;
  style?: StyleProp<ViewStyle>;
};

const HIT_SLOP = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

export function StudyCard(props: TProps) {
  const onPressHeart = React.useCallback(() => {
    // @todo: Handle the on press correctly by persisting the interest shown.
    Analytics.track(props.active ? events.STUDIES_HUB_INTEREST_OFF : events.STUDIES_HUB_INTEREST_ON);
  }, [props.active]);
  return (
    <TouchableOpacity
      accessible
      onPress={props.onPress}
      style={[styles.outerWrapper, styling.shadow, props.style]}
      testID={`study-card-${props.study.id}`}
    >
      <View style={styles.innerWrapper}>
        <View style={[styles.lineBlue, !props.active && styles.opacity]} />
        <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginBottom} textClass="pSmallMedium">
          {props.study.organiser}
        </Text>
        <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginBottom} textClass="h5Medium">
          {props.study.title}
        </Text>
        <View style={styles.rowWrapper}>
          <IconTime />
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginLeft} textClass="pXSmall">
            {props.study.duration}
          </Text>
        </View>
        <View style={styles.rowWrapper}>
          <IconArrowRight />
          <Text inverted colorPalette="uiDark" colorShade="main" style={styles.marginLeft} textClass="pXSmall">
            {i18n.t('studies-hub.study-card.more-details')}
          </Text>
        </View>
        <View style={styles.lineHorizontal} />
        <View style={styles.footerWrapper}>
          <IconPeople style={styles.marginRight} />
          {props.active ? (
            <>
              <Text
                inverted
                colorPalette="actionSecondary"
                colorShade="main"
                testID={`study-card-${props.study.id}-you-text`}
                textClass="pMedium"
              >
                {i18n.t('you')}
              </Text>
              <Text
                inverted
                colorPalette="uiDark"
                colorShade="darker"
                style={styles.marginHorizontal}
                textClass="pMedium"
              >
                +
              </Text>
            </>
          ) : null}
          <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pMedium">
            {props.study.amountParticipants.toLocaleString()}
          </Text>
          <View style={styles.lineVertical} />
          <TouchableOpacity hitSlop={HIT_SLOP} onPress={onPressHeart}>
            <IconHeart
              full={props.active}
              style={styles.marginRight}
              testID={`study-card-${props.study.id}-icon-heart`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  innerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: sizes.m,
    overflow: 'hidden',
    paddingHorizontal: sizes.m,
    paddingTop: sizes.m,
  },
  lineBlue: {
    backgroundColor: colors.darkblue,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 6,
  },
  lineHorizontal: {
    backgroundColor: colors.hrColor,
    height: 1,
  },
  lineVertical: {
    backgroundColor: colors.hrColor,
    height: 24,
    marginHorizontal: sizes.m,
    marginVertical: sizes.xs,
    width: 1,
  },
  marginBottom: {
    marginBottom: sizes.xs,
  },
  marginHorizontal: {
    marginHorizontal: sizes.xxs,
  },
  marginLeft: {
    marginLeft: sizes.xs,
  },
  marginRight: {
    marginRight: sizes.xs,
  },
  opacity: {
    opacity: 0.35,
  },
  outerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: sizes.m,
  },
  rowWrapper: {
    flexDirection: 'row',
    marginBottom: sizes.xs,
  },
});

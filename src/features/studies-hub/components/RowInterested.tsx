import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { IconHeart } from '@covid/features/studies-hub/components/IconHeart';
import { IconPeople } from '@covid/features/studies-hub/components/IconPeople';
import { TStudy } from '@covid/features/studies-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type TProps = {
  active: boolean;
  study: TStudy;
  style?: StyleProp<ViewStyle>;
};

const HIT_SLOP = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

export function RowInterested(props: TProps) {
  const onPressHeart = React.useCallback(() => {
    // @todo: Handle the on press correctly by persisting the interest shown.
    Analytics.track(props.active ? events.STUDIES_HUB_INTEREST_OFF : events.STUDIES_HUB_INTEREST_ON);
  }, [props.active]);
  return (
    <View style={[styles.view, props.style]}>
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
          <Text inverted colorPalette="uiDark" colorShade="darker" style={styles.marginHorizontal} textClass="pMedium">
            +
          </Text>
        </>
      ) : null}
      <Text inverted colorPalette="uiDark" colorShade="darker" textClass="pMedium">
        {props.study.amountParticipants.toLocaleString()}
      </Text>
      <View style={styles.lineVertical} />
      <TouchableOpacity hitSlop={HIT_SLOP} onPress={onPressHeart}>
        <IconHeart full={props.active} style={styles.marginRight} testID={`study-card-${props.study.id}-icon-heart`} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  lineVertical: {
    backgroundColor: colors.hrColor,
    height: 24,
    marginHorizontal: sizes.m,
    width: 1,
  },
  marginHorizontal: {
    marginHorizontal: sizes.xxs,
  },
  marginRight: {
    marginRight: sizes.xs,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

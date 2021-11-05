import { Text } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { IconPeople } from '@covid/features/studies-hub/components/IconPeople';
import { TouchableIconHeart } from '@covid/features/studies-hub/components/TouchableIconHeart';
import { InterestShownModal } from '@covid/features/studies-hub/modals/InterestShownModal';
import { TStudy } from '@covid/features/studies-hub/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

type TProps = {
  active: boolean;
  study: TStudy;
  style?: StyleProp<ViewStyle>;
};

export function RowInterested(props: TProps) {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const startupInfo = useSelector(selectStartupInfo);

  const onPressHeart = React.useCallback(async () => {
    setLoading(true);
    if (!props.active && startupInfo && !startupInfo?.studies_hub_interested_modal_seen) {
      setShowModal(true);
      // @todo: Make api call to register user has seen modal.
    }
    // @todo: Handle the on press correctly by persisting the interest shown.
    Analytics.track(props.active ? events.STUDIES_HUB_INTEREST_OFF : events.STUDIES_HUB_INTEREST_ON);
    // @todo: Make api call to register users interest in study.
    setLoading(false);
  }, [props.active, startupInfo?.studies_hub_interested_modal_seen]);

  const onRequestClose = React.useCallback(() => setShowModal(false), [setShowModal]);

  return (
    <View style={[styles.view, props.style]}>
      <InterestShownModal onRequestClose={onRequestClose} visible={showModal} />
      <IconPeople style={styles.marginRight} />
      {props.active ? (
        <>
          <Text
            inverted
            colorPalette="actionSecondary"
            colorShade="main"
            testID={`row-interested-${props.study.id}-you-text`}
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
      {loading ? (
        <ActivityIndicator color={colors.purple} size={24} style={styles.marginRight} />
      ) : (
        <TouchableIconHeart
          full={props.active}
          onPress={onPressHeart}
          style={styles.marginRight}
          testID={`row-interested-${props.study.id}-icon-heart`}
        />
      )}
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

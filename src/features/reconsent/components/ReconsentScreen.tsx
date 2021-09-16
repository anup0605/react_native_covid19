import { BrandedButton } from '@covid/components/buttons';
import { Screen } from '@covid/components/Screen';
import ChevronLeft from '@covid/features/reconsent/components/ChevronLeft';
import { sizes } from '@covid/themes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps {
  activeDot?: number;
  buttonOnPress?: () => void;
  buttonTitle?: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  noPadding?: boolean;
  testID: string;
}

const DOT_SIZE = 8;
const AMOUNT_DOTS = 3;

const dots = Array(AMOUNT_DOTS)
  .fill(null)
  .map((_, i) => i);

const hitSlop = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

export default function ReconsentScreen(props: IProps) {
  const navigation = useNavigation();

  function renderHeader() {
    return !props.hideBackButton || props.activeDot ? (
      <View style={styles.headerWrapper}>
        {props.hideBackButton ? null : (
          <TouchableOpacity hitSlop={hitSlop} onPress={navigation.goBack} testID="button-back-navigation">
            <ChevronLeft />
          </TouchableOpacity>
        )}
        {props.activeDot ? (
          <View pointerEvents="none" style={styles.dotsWrapper}>
            {dots.map((_, index) => (
              <View
                // eslint-disable-next-line react/no-array-index-key
                key={`dot-${index}`}
                style={[
                  index > 0 && styles.marginLeft,
                  index + 1 === props.activeDot ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        ) : null}
      </View>
    ) : null;
  }

  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      noPadding={props.noPadding}
      renderHeader={renderHeader}
      testID={props.testID}
    >
      {props.children}

      {props.buttonOnPress && props.buttonTitle ? (
        <BrandedButton
          onPress={props.buttonOnPress}
          style={styles.button}
          testID={`button-cta-${props.testID || 'screen'}`}
        >
          {props.buttonTitle}
        </BrandedButton>
      ) : null}
    </Screen>
  );
}

const dotStyle: ViewStyle = {
  borderRadius: DOT_SIZE / 2,
  height: DOT_SIZE,
  width: DOT_SIZE,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    marginTop: 'auto',
  },
  dotActive: {
    ...dotStyle,
    backgroundColor: colors.brand,
  },
  dotInactive: {
    ...dotStyle,
    backgroundColor: colors.backgroundFour,
  },
  dotsWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: sizes.m,
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingTop: sizes.screenVerticalPadding,
  },
  marginLeft: {
    marginLeft: DOT_SIZE / 2,
  },
});

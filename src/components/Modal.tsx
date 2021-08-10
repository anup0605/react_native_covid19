import { RegularText, SafeLayout } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { Modal as RNModal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer from 'react-native-swipe-gestures';

interface IProps {
  children?: React.ReactNode;
  footerChildren?: React.ReactNode;
  modalName?: string;
  onRequestClose: () => void;
  visible: boolean;
  showVerticalScrollIndicator?: boolean;
  animationType?: 'fade' | 'none' | 'slide';
  swipeUp?: Function;
  swipeDown?: Function;
  swipeLeft?: Function;
  swipeRight?: Function;
  testID?: string;
  showCloseButton?: boolean;
}

const BORDER_RADIUS = 16;
const CONTENT_SPACING = 20;
const SCROLL_INDICATOR_OFFSET = BORDER_RADIUS / 4 + 2;

// These magic numbers make sure the scroll indicator aligns pixel perfect to the edge on iOS.
const INSETS = {
  bottom: -3,
  left: 0,
  right: -3,
  top: -3,
};

const COLORS = ['#ffffff00', 'white'];

export default function Modal(props: IProps) {
  React.useEffect(() => {
    if (props.modalName) {
      Analytics.trackModalView(props.modalName);
    }
  }, [props.modalName]);

  function onSwipeUp() {
    if (props.swipeUp) {
      props.swipeUp();
    }
  }

  function onSwipeDown() {
    if (props.swipeDown) {
      props.swipeDown();
    }
  }

  function onSwipeLeft() {
    if (props.swipeLeft) {
      props.swipeLeft();
    }
  }

  function onSwipeRight() {
    if (props.swipeRight) {
      props.swipeRight();
    }
  }

  function hasSwipe(): boolean {
    return (
      props.swipeUp !== undefined ||
      props.swipeDown !== undefined ||
      props.swipeLeft !== undefined ||
      props.swipeRight !== undefined
    );
  }

  function renderCloseButton() {
    return props.showCloseButton && props.onRequestClose ? (
      <TouchableOpacity onPress={props.onRequestClose} testID={'test-modal-close-button'}>
        <RegularText style={styles.closeButton}>{i18n.t('modal-close')}</RegularText>
      </TouchableOpacity>
    ) : null;
  }

  function renderContent() {
    return (
      <RNModal
        transparent
        animationType={props.animationType ?? 'fade'}
        onRequestClose={props.onRequestClose}
        visible={props.visible}
      >
        <SafeLayout style={styles.safeLayout}>
          <View style={styles.view} testID={props.testID ?? 'test-modal'}>
            <View style={styles.view2}>
              {renderCloseButton()}
              <ScrollView
                alwaysBounceVertical={false}
                contentContainerStyle={styles.contentContainer}
                scrollIndicatorInsets={INSETS}
                showsVerticalScrollIndicator={props.showVerticalScrollIndicator || false}
                style={styles.scrollView}
              >
                {props.children}
              </ScrollView>
              {props.footerChildren ? (
                <View style={styles.padding}>
                  <LinearGradient colors={COLORS} style={styles.linearGradient} />
                  {props.footerChildren}
                </View>
              ) : null}
            </View>
          </View>
        </SafeLayout>
      </RNModal>
    );
  }

  return hasSwipe() ? (
    <GestureRecognizer
      onSwipeUp={(state) => onSwipeUp()}
      onSwipeDown={(state) => onSwipeDown()}
      onSwipeLeft={(state) => onSwipeLeft()}
      onSwipeRight={(state) => onSwipeRight()}
    >
      {renderContent()}
    </GestureRecognizer>
  ) : (
    renderContent()
  );
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'flex-end',
    textAlign: 'right',
    padding: 16,
    paddingBottom: 0,
    fontWeight: '600',
    color: colors.lightBrand,
  },
  contentContainer: {
    padding: CONTENT_SPACING - SCROLL_INDICATOR_OFFSET,
  },
  linearGradient: {
    backgroundColor: '#ffffff00',
    height: CONTENT_SPACING,
    left: CONTENT_SPACING,
    position: 'absolute',
    right: CONTENT_SPACING,
    top: -CONTENT_SPACING,
    zIndex: 1,
  },
  padding: {
    paddingBottom: CONTENT_SPACING,
    paddingHorizontal: CONTENT_SPACING,
  },
  safeLayout: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollView: {
    margin: SCROLL_INDICATOR_OFFSET,
  },
  view: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 1,
    marginBottom: 'auto',
    marginTop: 'auto',
    padding: CONTENT_SPACING,
  },
  view2: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    flex: 0,
    flexGrow: 0,
    flexShrink: 1,
  },
});

import { SafeLayout } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import * as React from 'react';
import { Modal as RNModal, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  children?: React.ReactNode;
  footerChildren?: React.ReactNode;
  modalName?: string;
  onRequestClose: () => void;
  visible: boolean;
  showVerticalScrollIndicator?: boolean;
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
  return (
    <RNModal transparent animationType="fade" onRequestClose={props.onRequestClose} visible={props.visible}>
      <SafeLayout style={styles.safeLayout}>
        <View style={styles.view}>
          <View style={styles.view2}>
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

const styles = StyleSheet.create({
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

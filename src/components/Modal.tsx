import { SafeLayout } from '@covid/components';
import Analytics from '@covid/core/Analytics';
import * as React from 'react';
import { Modal as RNModal, ScrollView, StyleSheet } from 'react-native';

interface IProps {
  children?: React.ReactNode;
  modalName?: string;
  onRequestClose: () => void;
  visible: boolean;
}

export default function Modal(props: IProps) {
  React.useEffect(() => {
    if (props.modalName) {
      Analytics.trackModalView(props.modalName);
    }
  }, [props.modalName]);
  return (
    <RNModal transparent animationType="fade" onRequestClose={props.onRequestClose} visible={props.visible}>
      <SafeLayout style={styles.modal}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {props.children}
        </ScrollView>
      </SafeLayout>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollView: {
    borderRadius: 16,
    flexGrow: 0,
    marginBottom: 'auto',
    marginHorizontal: 24,
    marginTop: 'auto',
  },
});

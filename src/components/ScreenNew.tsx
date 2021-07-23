import { PatientHeader } from '@covid/components/PatientHeader';
import { TProfile } from '@covid/core/profile/ProfileService';
import { colors } from '@theme';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Keep in mind that certain styling properties don't work on the SafeAreaView.
// For example setting a padding is ignored.

interface IProps {
  children?: React.ReactNode;
  profile?: TProfile;
  testID: string;
}

function renderHeader(props: IProps) {
  if (props.profile) {
    return <PatientHeader profile={props.profile} />;
  }
  return null;
}

export function ScreenNew(props: IProps) {
  return (
    <SafeAreaView style={styles.safeAreaView} testID={props.testID}>
      {renderHeader(props)}
      <ScrollView contentContainerStyle={styles.contentContainer} testID={`scroll-view-${props.testID || 'screen'}`}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  safeAreaView: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});

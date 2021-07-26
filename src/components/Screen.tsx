import { TProfile } from '@covid/core/profile/ProfileService';
import { colors } from '@theme';
import * as React from 'react';
import {
  Dimensions,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavHeader, PatientHeader } from './PatientHeader';

export const screenWidth = Math.round(Dimensions.get('window').width) - 32;
export const screenHeight = Math.round(Dimensions.get('window').height);

type THeaderProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

export const Header = (props: THeaderProps) => {
  return <View style={[styles.headerBlock, props.style]}>{props.children}</View>;
};

type TProgressBlockProps = {
  children: React.ReactNode;
};

export const ProgressBlock = (props: TProgressBlockProps) => {
  return <View style={styles.progressBlock}>{props.children}</View>;
};

type TFieldWrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const FieldWrapper = (props: TFieldWrapperProps) => {
  return <View style={[styles.fieldWrapper, props.style]}>{props.children}</View>;
};

type TScreenProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  profile?: TProfile;
  simpleCallout?: boolean;
  calloutTitle?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
  extendEdges?: boolean;
  scrollEnabled?: boolean;
  testID?: string;
};

function renderHeader(props: TScreenProps) {
  if (props.profile) {
    return (
      <PatientHeader
        calloutTitle={props.calloutTitle}
        profile={props.profile}
        showCloseButton={props.showCloseButton}
        simpleCallout={props.simpleCallout}
      />
    );
  }
  if (props.showBackButton) {
    return <NavHeader showCloseButton={props.showCloseButton} />;
  }
  if (props.showCloseButton) {
    return <NavHeader showCloseButton={props.showCloseButton} />;
  }
  if (props.extendEdges) {
    return <View />;
  }
  return <View style={styles.statusBarBlock} />;
}

export default function Screen(props: TScreenProps) {
  const scrollEnabled = props.scrollEnabled === undefined ? true : props.scrollEnabled;

  return (
    <SafeAreaView style={[styles.screen, props.style]} testID={props.testID}>
      {renderHeader(props)}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        {!scrollEnabled ? <View style={styles.pageBlock}>{props.children}</View> : null}
        {scrollEnabled ? (
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            testID={`scroll-view-${props.testID || 'screen'}`}
          >
            {props.extendEdges ? (
              <View style={styles.pageBlockExtendedEdges}>{props.children}</View>
            ) : (
              <View style={styles.pageBlock}>{props.children}</View>
            )}
          </ScrollView>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  fieldWrapper: {
    marginVertical: 16,
  },
  flex: {
    flex: 1,
  },
  headerBlock: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  pageBlock: {
    flexGrow: 1,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  pageBlockExtendedEdges: {
    marginHorizontal: 0,
  },
  progressBlock: {
    marginHorizontal: 16,
  },
  screen: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  statusBarBlock: {
    marginVertical: 32,
  },
});

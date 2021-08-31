import { Text } from '@covid/components/typography';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const styles = StyleSheet.create({
  base: {
    borderRadius: sizes.xs,
    height: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: sizes.m,
    height: 200,
    justifyContent: 'space-between',
    marginVertical: sizes.s,
    padding: sizes.l,
  },
  three: {
    height: 12,
    marginTop: sizes.s,
    width: '35%',
  },
  two: {
    marginTop: sizes.s,
    width: '30%',
  },
});

type TContentErrorViewProps = {
  message: string;
};

const ContentErrorView: React.FC<TContentErrorViewProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'center',
        },
      ]}
    >
      <Text style={{ marginHorizontal: sizes.s }} textAlign="center" textClass="p">
        {message}
      </Text>
    </View>
  );
};

type TContentLoadingViewProps = {
  loading?: boolean;
  errorMessage?: string;
  disableShimmers?: boolean;
};

export const ContentLoadingView: React.FC<TContentLoadingViewProps> = ({
  loading,
  errorMessage,
  disableShimmers,
  children,
}) => {
  const enableShimmers = !disableShimmers;
  if (errorMessage) {
    return <ContentErrorView message={errorMessage} />;
  }

  return (
    <View>
      {loading && enableShimmers ? (
        <View style={styles.container}>
          <View>
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base]} />
            <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.two]} />
          </View>
          <ShimmerPlaceholder LinearGradient={LinearGradient} style={[styles.base, styles.three]} />
        </View>
      ) : null}
      <View style={[loading && { opacity: 0, position: 'absolute' }]}>{children}</View>
    </View>
  );
};

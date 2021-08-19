import { Text } from '@covid/components/typography';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    height: 20,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: 200,
    justifyContent: 'space-between',
    marginVertical: 12,
    padding: 20,
  },
  three: {
    height: 12,
    marginTop: 12,
    width: '35%',
  },
  two: {
    marginTop: 12,
    width: '30%',
  },
});

type TContentErrorViewProps = {
  message: string;
};

export const ContentErrorView: React.FC<TContentErrorViewProps> = ({ message }) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: 'center',
        },
      ]}
    >
      <Text style={{ marginHorizontal: 12 }} textAlign="center" textClass="p">
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

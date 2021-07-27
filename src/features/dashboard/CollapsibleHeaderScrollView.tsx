import { DrawerToggle } from '@covid/components/DrawerToggle';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import * as React from 'react';
import { Animated, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

type TConfig = {
  compact: number;
  expanded: number;
};

interface Iprops {
  compactHeader: React.ReactNode;
  config: TConfig;
  expandedHeader: React.ReactNode;
  navigation: DrawerNavigationProp<TScreenParamList>;
}

export const CollapsibleHeaderScrollView: React.FC<Iprops> = (props) => {
  const [scrollY, _] = React.useState<Animated.Value>(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact],
    outputRange: [props.config.expanded, props.config.compact],
  });

  // Fade in Compact header as user scroll down
  const compactHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [props.config.compact, props.config.expanded - props.config.compact],
    outputRange: [0, 1],
  });

  // Fade out Expanded header as user scroll down
  const expandedHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact - 75],
    outputRange: [1, 0],
  });

  // Slide up Compact header as user scroll down
  const compactHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact],
    outputRange: [50, 0],
  });

  // Slide up Expanded header as user scroll down
  const expandedHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact],
    outputRange: [0, -25],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.drawerToggleContainer}>
          <DrawerToggle navigation={props.navigation} style={{ tintColor: colors.white }} testID="drawer-toggle" />
        </View>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              {
                opacity: expandedHeaderOpacity,
                top: expandedHeaderY,
              },
              styles.expandedHeaderContainer,
            ]}
          >
            {props.expandedHeader}
          </Animated.View>
          <Animated.View
            style={{
              opacity: compactHeaderOpacity,
              paddingTop: compactHeaderY,
            }}
          >
            {props.compactHeader}
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: props.config.expanded }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{
            top: props.config.expanded,
          }}
          style={styles.scrollContainer}
        >
          {props.children}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.predict,
    flex: 1,
  },
  drawerToggleContainer: {
    marginRight: 16,
    marginTop: 32,
    position: 'absolute',
    right: 0,
    zIndex: 999,
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
  },
  header: {
    backgroundColor: colors.predict,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: -0,
    width: SCREEN_WIDTH,
    zIndex: 99,
  },
  scrollContainer: {
    backgroundColor: colors.backgroundTertiary,
  },
  subContainer: {
    flex: 1,
    paddingTop: 16,
  },
});

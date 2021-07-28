import * as screens from '@covid/features/screens';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenEntries = Object.entries(screens);

export default function DebugScreens(props: any) {
  const [index, setIndex] = React.useState(0);
  if (!__DEV__) {
    return null;
  }
  function onPress() {
    setIndex((previousIndex) => (previousIndex === screenEntries.length - 1 ? 0 : previousIndex + 1));
  }
  const Screen = screenEntries[index][1];
  return (
    <>
      {/* @ts-expect-error */}
      <Screen {...props} />
      <View pointerEvents="box-none" style={styles.view}>
        <TouchableOpacity onPress={onPress} style={styles.touchableOpacity}>
          <Text>{index}</Text>
          <Text>{screenEntries[index][0]}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
    minWidth: 250,
    width: '33%',
  },
  view: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

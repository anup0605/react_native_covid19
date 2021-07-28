import * as screens from '@covid/features/screens';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenEntries = Object.entries(screens);

export default function DebugScreens(props: any) {
  const [index, setIndex] = React.useState(14);
  const [showInfo, setShowInfo] = React.useState(true);
  if (!__DEV__) {
    return null;
  }
  function onLongPress() {
    setShowInfo((previousShowInfo) => !previousShowInfo);
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
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={styles.touchableOpacity}>
          {showInfo ? (
            <>
              <Text style={styles.text}>{index}</Text>
              <Text style={styles.text}>{screenEntries[index][0]}</Text>
            </>
          ) : null}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
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

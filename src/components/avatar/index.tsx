import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

interface IProps {
  source: ImageSourcePropType;
}

export function Avatar(props: IProps) {
  return (
    <View style={styles.view}>
      <Image source={props.source} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1.0,
    height: undefined,
    resizeMode: 'contain',
    width: 60,
  },
  view: {
    alignItems: 'center',
    backgroundColor: 'pink',
    borderColor: 'white',
    borderRadius: 60,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 60,
  },
});

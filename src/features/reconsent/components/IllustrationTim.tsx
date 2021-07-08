import { timSpectorAvatar } from '@assets';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

export default function IllustrationTim(props: IProps) {
  return (
    <View style={props.style}>
      <Svg fill="none" height={243} viewBox="0 0 327 243" width={327}>
        <Path
          d="M262.354 116.476a3.71 3.71 0 00.358-5.237 3.711 3.711 0 00-5.236-.375 3.713 3.713 0 00-.358 5.238 3.711 3.711 0 005.236.374zM245.22 152.199a3.712 3.712 0 00.358-5.237 3.713 3.713 0 00-5.237-.375 3.713 3.713 0 00-.358 5.238 3.712 3.712 0 005.237.374zM198.313 165.411a3.713 3.713 0 00.358-5.238 3.711 3.711 0 00-5.236-.374 3.711 3.711 0 00-.358 5.237 3.711 3.711 0 005.236.375zM146.284 126.322a3.712 3.712 0 00.358-5.237 3.711 3.711 0 00-5.236-.375 3.712 3.712 0 00-.358 5.238 3.712 3.712 0 005.236.374zM290.963 188.129a3.713 3.713 0 00.358-5.238 3.713 3.713 0 00-5.237-.374 3.712 3.712 0 00-.358 5.237 3.713 3.713 0 005.237.375zM221.452 228.728a3.713 3.713 0 00.358-5.238 3.712 3.712 0 00-5.236-.374 3.712 3.712 0 00-.358 5.238 3.712 3.712 0 005.236.374zM294.574 125.991a3.713 3.713 0 00.358-5.238 3.712 3.712 0 00-5.236-.374 3.712 3.712 0 00-.358 5.237 3.711 3.711 0 005.236.375zM311.534 165.69a3.713 3.713 0 00.358-5.238 3.712 3.712 0 00-5.236-.374 3.71 3.71 0 00-.358 5.237 3.711 3.711 0 005.236.375z"
          fill="#CCE0F0"
        />
        <Path
          d="M259.908 113.663l-16.512 35.287s46.282 36.702 45.882 35.954c-.4-.748-29.37-71.241-29.37-71.241zM243.404 148.958l-47.53 13.647-52.029-39.089 99.559 25.442zM259.915 113.67l32.239 9.551 16.538 39.881"
          stroke="#CCE0F0"
          strokeMiterlimit={10}
          strokeWidth={0.75}
        />
        <Path
          d="M195.875 162.605l23.146 63.324 24.383-76.971M288.523 185.323l-69.509 40.599"
          stroke="#CCE0F0"
          strokeMiterlimit={10}
          strokeWidth={0.75}
        />
        <Path
          d="M118.177 131.984a3.71 3.71 0 005.095 1.262 3.712 3.712 0 001.279-5.092 3.714 3.714 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.092zM85.972 108.907a3.713 3.713 0 005.095 1.262 3.712 3.712 0 001.278-5.092 3.711 3.711 0 00-5.096-1.262 3.712 3.712 0 00-1.277 5.092zM81.108 60.418a3.712 3.712 0 005.096 1.262 3.712 3.712 0 001.278-5.091 3.712 3.712 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.091zM128.637 15.967a3.711 3.711 0 005.095 1.262 3.71 3.71 0 001.278-5.092 3.711 3.711 0 00-5.095-1.262 3.71 3.71 0 00-1.278 5.092zM42.645 147.715a3.711 3.711 0 005.096 1.262 3.712 3.712 0 001.278-5.092 3.713 3.713 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.092zM14.734 72.212a3.712 3.712 0 005.096 1.261 3.712 3.712 0 001.278-5.091 3.712 3.712 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.091zM103.213 162.062a3.711 3.711 0 005.096 1.262 3.712 3.712 0 001.278-5.092 3.714 3.714 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.092zM61.172 171.871a3.713 3.713 0 005.096 1.262 3.713 3.713 0 001.278-5.092 3.711 3.711 0 00-5.096-1.262 3.712 3.712 0 00-1.278 5.092z"
          fill="#CCE0F0"
        />
        <Path
          d="M121.372 130.064l-31.884-22.389s-44.181 39.206-43.375 38.941c.806-.264 75.259-16.552 75.259-16.552zM89.48 107.68l-5.186-49.177 47.529-44.451L89.48 107.68zM121.364 130.069l-15.004 30.09-42.147 9.362M84.294 58.503L17.912 70.302 89.48 107.68M45.833 145.8L17.921 70.297"
          stroke="#CCE0F0"
          strokeMiterlimit={10}
          strokeWidth={0.75}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.view}>
          <Image resizeMode="contain" source={timSpectorAvatar} style={styles.image} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    height: undefined,
    width: '100%',
  },
  view: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundWhiteBlue,
    borderRadius: 90,
    height: 180,
    marginBottom: 'auto',
    marginTop: 'auto',
    overflow: 'hidden',
    width: 180,
  },
});
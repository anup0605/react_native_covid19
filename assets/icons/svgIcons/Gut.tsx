import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/utils';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 36;
const defaultHeight = 35;

export default function Gut({ color = colors.darkblue, ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 36 35" width={width}>
      <Path
        d="M25.1094 4.37257H9.79688C6.17251 4.37257 3.23438 7.31071 3.23438 10.9351C3.23438 14.5594 6.17251 17.4976 9.79688 17.4976M21.2812 17.4976H9.79688M9.79688 17.4976H25.6562M9.79688 17.4976C6.17251 17.4976 3.23438 20.4357 3.23438 24.0601C3.23438 27.6844 6.17251 30.6226 9.79688 30.6226H25.6562M21.2812 10.9351H9.25M26.2031 24.0601H10.3438M26.2031 24.0601C29.8275 24.0601 32.7656 21.1219 32.7656 17.4976C32.7656 13.8732 29.8275 10.9351 26.2031 10.9351L14.7188 10.9351M26.2031 24.0601H14.7188M26.2031 24.0601C29.8275 24.0601 32.7656 26.9982 32.7656 30.6226C32.7656 31.4428 32.6152 32.2278 32.3403 32.9517C32.2179 33.2741 32.0707 33.5845 31.9012 33.8803M14.7188 10.9156H26.2031C29.8275 10.9156 32.7656 7.97745 32.7656 4.35308C32.7656 3.53288 32.6152 2.74782 32.3403 2.024C32.2179 1.70152 32.0707 1.3912 31.9012 1.09534"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

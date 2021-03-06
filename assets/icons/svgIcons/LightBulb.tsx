import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/utils';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 36;
const defaultHeight = 35;

export default function LightBulb({ color = colors.darkblue, ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 36 35" width={width}>
      <Path
        d="M12.5312 28.4377H23.4687M12.5312 13.1337C12.5312 11.6833 13.1074 10.2923 14.133 9.26671C15.1586 8.24112 16.5496 7.66495 18 7.66495M30.0312 13.1337C30.0328 10.995 29.4642 8.89458 28.3841 7.04869C27.304 5.2028 25.7513 3.6782 23.8861 2.63189C22.0208 1.58558 19.9103 1.05539 17.772 1.09591C15.6337 1.13643 13.5449 1.74621 11.7206 2.86244C9.89632 3.97868 8.40255 5.56101 7.39314 7.4465C6.38372 9.33198 5.89514 11.4525 5.97772 13.5896C6.0603 15.7266 6.71105 17.8031 7.86295 19.6051C9.00384 21.3898 10.5955 22.8414 12.4767 23.8135C12.5101 23.8308 12.5312 23.8652 12.5312 23.9028V28.4462C12.5312 31.4665 14.9797 33.915 18 33.915C21.0203 33.915 23.4687 31.4665 23.4687 28.4462V23.9137C23.4687 23.8761 23.4899 23.8417 23.5233 23.8245C25.4748 22.816 27.1134 21.2922 28.2609 19.4181C29.419 17.5265 30.0317 15.3516 30.0312 13.1337Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

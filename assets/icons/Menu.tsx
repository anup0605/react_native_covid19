import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type TProps = {
  height?: number;
  width?: number;
};

export function Menu(props: TProps) {
  return (
    <Svg fill="none" height={props.height || 20} viewBox="0 0 20 20" width={props.width || 20}>
      <Path
        d="
        M 0 19 h 20
        M 0 10 h 20
        M 0 1 h 20"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

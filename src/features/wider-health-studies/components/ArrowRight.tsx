import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function ArrowRight() {
  return (
    <Svg fill="none" height={16} width={16}>
      <Path
        d="M9.75 13l4.788-4.793a.298.298 0 00.002-.423L9.75 3M1.201 7.994h13.28"
        stroke="#A10056"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

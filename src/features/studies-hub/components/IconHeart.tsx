import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type TProps = SvgProps & {
  full?: boolean;
};

export function IconHeart(props: TProps) {
  return (
    <Svg fill="none" height={24} width={24} {...props}>
      <Path
        clipRule="evenodd"
        d="M6.648 2.625C3.395 2.625.75 5.349.75 8.697c0 7.133 9.083 12.556 10.956 13.669a.573.573 0 00.588 0c1.875-1.11 10.956-6.518 10.956-13.67 0-3.347-2.646-6.071-5.9-6.071-3.732 0-5.35 3.413-5.35 3.413s-1.625-3.413-5.352-3.413z"
        fill={props.full ? '#A10056' : undefined}
        fillRule={props.full ? 'evenodd' : undefined}
        stroke="#A10056"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

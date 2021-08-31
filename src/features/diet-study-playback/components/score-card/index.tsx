import { sizes } from '@covid/themes';
import * as React from 'react';
import { Animated } from 'react-native';

type TDirection = 'UP' | 'DOWN';

interface IProps {
  backgroundColor: any;
  children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
  direction?: TDirection;
}

function ScoreCard({ backgroundColor, children, direction = 'DOWN' }: IProps) {
  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          alignSelf: 'flex-start',
          ...backgroundColor,
          borderRadius: sizes.xs,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingVertical: sizes.xs,
          width: 60,
        },
        direction === 'DOWN' ? { marginBottom: sizes.m } : { marginTop: sizes.m },
      ]}
    >
      <Animated.View
        style={[
          {
            ...backgroundColor,
            height: 20,
            position: 'absolute',
            transform: [{ rotate: '45deg' }],
            width: 20,
          },
          direction === 'DOWN' ? { bottom: -10 } : { top: -10 },
        ]}
      />
      {children}
    </Animated.View>
  );
}

export default ScoreCard;

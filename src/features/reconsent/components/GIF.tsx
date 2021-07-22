import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

interface IProps {
  height: number;
  style?: StyleProp<ImageStyle>;
  source?: ImageSourcePropType;
  width: number;
}

export default function GIF(props: IProps) {
  if (props.source) {
    return (
      <Image
        source={props.source}
        style={[
          {
            height: props.height,
            width: props.width,
          },
          props.style,
        ]}
      />
    );
  }
  return null;
}

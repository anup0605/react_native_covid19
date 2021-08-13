import { styling } from '@covid/themes';
import * as React from 'react';
import { Image, ImageSourcePropType, ImageStyle, LayoutChangeEvent, StyleProp, View } from 'react-native';

type TProps = {
  fullWidth?: boolean;
  height?: number;
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  uri?: string;
  width?: number;
};

export function ScalableImage(props: TProps) {
  const [ratio, setRatio] = React.useState(0);
  const [measuredWidth, setMeasuredWidth] = React.useState(0);

  const source = React.useMemo(() => props.source || { uri: props.uri }, [props.source, props.uri]);

  React.useEffect(() => {
    function handleSize(width: number, height: number) {
      setRatio(width / height);
    }

    if (props.uri) {
      Image.getSize(props.uri, handleSize);
    }

    if (props.source) {
      const result = Image.resolveAssetSource(props.source);
      handleSize(result.width, result.height);
    }
  }, [source]);

  function onLayout(event: LayoutChangeEvent) {
    setMeasuredWidth(event.nativeEvent.layout.width);
  }

  let width = 0;
  let height = 0;
  if (props.width && props.height) {
    width = props.width;
    height = props.height;
  } else if (props.fullWidth) {
    width = measuredWidth;
    height = measuredWidth / ratio;
  } else if (props.width) {
    width = props.width;
    height = measuredWidth / ratio;
  } else if (props.height) {
    width = measuredWidth * ratio;
    height = props.height;
  }

  return (
    <>
      {props.fullWidth ? <View onLayout={onLayout} style={styling.measureWidth} /> : null}
      {width && height ? <Image source={source} style={[{ height, width }, props.style]} /> : null}
    </>
  );
}

import {
  ITheme,
  TColorPalette,
  TColorShade,
  TFontFamily,
  TFontStyle,
  TGridSize,
  TTextAlign,
  TTextClass,
  TTtextDecorationLine,
  TTypeSizes,
  useTheme,
} from '@covid/themes';
import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { SText } from './styles';

export interface IProps {
  children: React.ReactNode;
  colorPalette?: TColorPalette;
  colorShade?: TColorShade;
  fontFamily?: TFontFamily | undefined;
  fontSize?: TTypeSizes | undefined;
  fontStyle?: TFontStyle | undefined;
  inverted?: boolean;
  letterSpacing?: number | undefined;
  lineHeight?: number | undefined;
  onPress?: () => void | undefined;
  rhythm?: TGridSize;
  style?: StyleProp<TextStyle>;
  textAlign?: TTextAlign | undefined;
  textDecorationLine?: TTtextDecorationLine | undefined;
  textClass?: TTextClass;
  numberOfLines?: number;
}

export default function Text({
  children,
  colorPalette = 'ui',
  colorShade = 'lighter',
  fontFamily = undefined,
  fontSize = undefined,
  fontStyle = undefined,
  inverted = false,
  letterSpacing = undefined,
  lineHeight = undefined,
  textDecorationLine = undefined,
  onPress = undefined,
  rhythm = 0,
  style = {},
  textAlign = undefined,
  textClass = 'default',
  numberOfLines = undefined,
}: IProps) {
  const theme: ITheme = useTheme();
  const fFamily = fontFamily || theme.text[textClass].fontFamily;
  const fSize = fontSize || theme.text[textClass].fontSize;
  const fStyle = fontStyle || theme.text[textClass].fontStyle;
  const lHeight = lineHeight || theme.text[textClass].lineHeight;
  const tAlign = textAlign || theme.text[textClass].textAlign;
  const lSpacing = letterSpacing || theme.text[textClass].letterSpacing;
  const tDecorationLine = textDecorationLine || theme.text[textClass].textDecorationLine;
  return (
    <SText
      colorPalette={colorPalette}
      colorShade={colorShade}
      fontFamily={fFamily}
      fontSize={fSize}
      fontStyle={fStyle}
      inverted={inverted}
      letterSpacing={lSpacing}
      lineHeight={lHeight}
      numberOfLines={numberOfLines}
      onPress={onPress}
      rhythm={rhythm}
      style={style}
      textAlign={tAlign}
      textDecorationLine={tDecorationLine}
    >
      {children}
    </SText>
  );
}

import { Text } from '@covid/components/typography';
import { TColorPalette, TColorShade } from '@covid/themes';
import { Animated, View } from 'react-native';
import styled from 'styled-components/native';

export type TVariant = 'top' | 'bottom';

interface IContainerProps {
  variant: TVariant;
}

export const SContainerView = styled(Animated.View)<IContainerProps>`
  ${(props) => `
    padding: ${props.theme.sizes.m}px;
    position: absolute;
    ${props.variant}: 0;
    width: 100%;
  `}
`;

interface ICardViewProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SCardView = styled(View)<ICardViewProps>`
  ${(props) => `
    align-items: center;
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-radius: ${props.theme.sizes.xxs}px;
    flex-direction: row;
    padding: ${props.theme.sizes.m}px;
  `}
`;

interface IMessageTextProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SMessageText = styled(Text)<IMessageTextProps>`
  ${() => `
    flex: 1;
  `}
`;

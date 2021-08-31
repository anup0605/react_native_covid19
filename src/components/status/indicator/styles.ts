import { TColorPalette, TColorShade } from '@covid/themes';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SIndicatorView = styled(View)<IProps>`
  ${(props) => `
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-radius: ${props.theme.sizes.s * 0.5}px;
    height: ${props.theme.sizes.s}px;
    width: ${props.theme.sizes.s}px;
  `}
`;

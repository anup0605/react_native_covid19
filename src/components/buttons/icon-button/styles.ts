import { TColorPalette, TColorShade } from '@covid/themes';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
  outline: boolean;
  simple: boolean;
}

export const STouchableOpacity = styled(TouchableOpacity)<IProps>`
  ${(props) => `
    align-items: center;
    background-color: ${
      props.outline || props.simple ? 'transparent' : props.theme.colors[props.colorPalette][props.colorShade].bgColor
    };
    border-color: ${
      props.outline && !props.simple ? props.theme.colors[props.colorPalette][props.colorShade].bgColor : 'transparent'
    };
    border-radius: ${props.theme.sizes.m}px;
    height: ${props.theme.sizes.xl}px;
    justify-content: center;
    padding: ${props.theme.sizes.xs}px ${props.theme.sizes.m}px;
    width: ${props.theme.sizes.xl}px;
  `}
`;

import { TColorPalette, TColorShade } from '@covid/themes';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface IContainerViewProps {
  height: number;
  top: number;
  bottom: number;
  width: number;
}

export const SContainerView = styled(View)<IContainerViewProps>`
  ${(props) => `
    align-items: center;
    height: ${props.height}px;
    left: 0;
    padding: ${props.top ? props.top : props.theme.sizes.m}px 16px ${
    props.bottom ? props.bottom : props.theme.sizes.xs
  }px;
    position: absolute;
    top: 0;
    width: ${props.width}px;
  `}
`;

export const SCloseContainerView = styled(View)`
  width: 100%;
  z-index: 5;
`;

export const SContentView = styled(View)`
  flex: 1;
  justify-content: center;
  width: 100%;
`;

export const SInnerContentView = styled(View)`
  ${(props) => `
    padding: ${props.theme.sizes.xxs}px;
  `}
`;

export const SButtonView = styled(View)`
  ${(props) => `
    margin-bottom: ${props.theme.sizes.l}px;
    width: 100%;
  `}
`;

export const SShareContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-top-left-radius: ${props.theme.sizes.m}px;
    border-top-right-radius: ${props.theme.sizes.m}px;
    width: 100%;
  `}
`;

interface IShareLabelProps {
  colorPalette: TColorPalette;
  colorShade: TColorShade;
}

export const SShareLabelView = styled(View)<IShareLabelProps>`
  ${(props) => `
    background-color: ${props.theme.colors[props.colorPalette][props.colorShade].bgColor};
    border-bottom-left-radius: ${props.theme.sizes.m}px;
    border-bottom-right-radius: ${props.theme.sizes.m}px;
    padding: ${props.theme.sizes.m}px ${props.theme.sizes.m}px;
    width: 100%;
  `}
`;

export const SRowView = styled(View)`
  ${() => `
    flex-direction: row;
  `}
`;

export const STextContainer = styled(View)`
  ${() => `
    flex: 1;
    padding-right: 16px;
  `}
`;

export const SLogoContainer = styled(View)`
  ${() => `
    align-items: center;
  `}
`;

export const SImageContainer = styled(View)`
  ${(props) => `
    align-items: center;
    background-color: #082A5D; 
    border-radius: ${props.theme.sizes.xs}px;
    justify-content: center;
    height: 56px;
    margin-bottom: ${props.theme.sizes.m}px;
    padding: ${props.theme.sizes.xxs}px;
    width: 56px;
  `}
`;

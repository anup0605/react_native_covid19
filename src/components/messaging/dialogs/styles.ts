import { Animated, View } from 'react-native';
import styled from 'styled-components/native';

interface IContainerViewProps {
  height: number;
  width: number;
}

export const SContainerView = styled(View)<IContainerViewProps>`
  ${(props) => `
    align-items: center;
    height: ${props.height};
    justify-content: center;
    left: 0;
    padding: ${props.theme.sizes.xl}px;
    position: absolute;
    top: 0;
    width: ${props.width};
  `}
`;

export const SMessageWindowView = styled(Animated.View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.sizes.m}px;
    padding: ${props.theme.sizes.m}px ${props.theme.sizes.m}px;
    width: 100%;
  `}
`;

export const STitleView = styled(View)`
  align-items: center;
`;

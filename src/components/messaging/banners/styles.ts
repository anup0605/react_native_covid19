import { Animated, View } from 'react-native';
import styled from 'styled-components/native';

interface IContainerViewProps {
  top: number;
  width: number;
}

export const SContainerView = styled(Animated.View)<IContainerViewProps>`
  ${(props) => `
    background-color: white;
    left: 0;
    padding: ${props.top + props.theme.sizes.l}px ${props.theme.sizes.m}px ${props.theme.sizes.m}px;
    position: absolute;
    top: 0;
    width: ${props.width}px;
  `}
`;

export const SButtonRowView = styled(View)`
  ${() => `
    flex-direction: row;
    justify-content: flex-end;
  `};
`;

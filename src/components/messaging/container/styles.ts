import { View } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  active: boolean;
  height: number;
  width: number;
}

export const SContainerView = styled(View)<IProps>`
  ${(props) => `
    background-color: rgba(0,0,0,0.5);
    height: ${props.active ? props.height : 0}px;
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: ${props.width}px;
    z-index: 1;
    elevation: 5;
  `}
`;

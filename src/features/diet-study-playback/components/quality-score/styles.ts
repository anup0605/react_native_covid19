import { colors } from '@theme/colors';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-color: ${colors.backgroundTertiary};
    border-radius: ${props.theme.sizes.m}px;
    border-width: 1px;
    margin: ${props.theme.sizes.xs}px 0;
    padding: ${props.theme.sizes.m}px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 3.84;
    elevation: 5;
  `}
`;

export const SScoreContainerView = styled(View)`
  ${(props) => `
    padding: ${props.theme.sizes.m}px 0;
  `}
`;

export const SScoreRangeContainerView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

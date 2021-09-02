import { Text } from '@covid/components/typography';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const SContainerView = styled(View)`
  ${(props) => `
    background-color: white;
    border-radius: ${props.theme.sizes.s}px;
    padding: ${props.theme.sizes.l}px ${props.theme.sizes.l}px 0 ${props.theme.sizes.l}px;
  `}
`;

export const STitleText = styled(Text)`
  ${(props) => `
    margin-bottom: ${props.theme.sizes.l}px;
  `}
`;

interface IStatsViewProps {
  isLast: boolean;
}

export const SStatsContainerView = styled(View)<IStatsViewProps>`
  ${(props) => `
    border-color: ${props.theme.colors.ui.dark.bgColor};
    border-bottom-width: ${props.isLast ? 0 : 1}px;
    margin-bottom: ${props.isLast ? 0 : props.theme.sizes.l}px;
    padding-bottom: ${props.isLast ? 0 : props.theme.sizes.l}px;
  `}
`;

export const SHealthStatus = styled(View)`
  ${() => `
    align-items: center;
    flex-direction: row;
  `}
`;

export const SHealthStatusText = styled(Text)`
  ${(props) => `
    margin-left: ${props.theme.sizes.xs}px;
  `}
`;

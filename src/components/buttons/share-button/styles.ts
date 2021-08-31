import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const SContainerView = styled(TouchableOpacity)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: ${(props) => props.theme.sizes.l}px 0;
`;

export const SIconContainerView = styled(View)`
  margin-right: ${(props) => props.theme.sizes.xs}px;
`;

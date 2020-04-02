import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 45px;
  border-radius: 4px;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.textColor};

  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

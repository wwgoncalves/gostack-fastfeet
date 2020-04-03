import styled from 'styled-components/native';
import { Platform } from 'react-native';

import logo from '~/assets/fastfeet-logo.png';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 25px;
  background-color: #7d40e7;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})``;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'Informe seu ID de cadastro',
  placeholderTextColor: '#999',
  autoCorrect: false,
  autoCapitalize: 'none',
  returnKeyType: 'send',
  keyboardType: 'number-pad',
})`
  background-color: #fff;
  height: 45px;
  padding: 0px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
`;

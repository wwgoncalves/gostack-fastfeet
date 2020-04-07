import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 20px;
  background-color: #fff;

  border-top-width: 90px;
  border-top-color: #7d40e7;
`;

export const Form = styled.View`
  flex: 1;
  margin-top: -90px;
  background-color: #fff;
  border-radius: 4px;
`;

export const Input = styled.TextInput.attrs({
  placeholder: 'Inclua aqui o problema que ocorreu na entrega.',
  placeholderTextColor: '#999',
  blurOnSubmit: true,
  returnKeyType: 'send',
  multiline: true,
  textAlignVertical: 'top',
  maxLength: 255,
  elevation: 1,
})`
  background-color: #fff;
  height: 300px;
  padding: 20px;
  font-size: 16px;
  color: #444;
  border-radius: 4px;
  margin-bottom: 20px;
`;

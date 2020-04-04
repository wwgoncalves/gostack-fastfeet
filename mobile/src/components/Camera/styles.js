import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CameraButton = styled(RectButton)`
  height: 60px;
  width: 60px;
  background-color: #0006;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`;

export const TakePhotoIcon = styled(Icon).attrs({
  name: 'photo-camera',
  size: 32,
  color: '#fff',
})``;

export const ActivityIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#7d40e7',
})`
  margin-bottom: 20px;
`;

export const CancelIcon = styled(Icon).attrs({
  name: 'clear',
  size: 32,
  color: '#f00',
})``;

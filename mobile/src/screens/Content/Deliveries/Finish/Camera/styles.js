import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CameraContainer = styled.View`
  flex: 1;
  margin-top: -90px;
  margin-bottom: 10px;
  /* height: 400px; */
  border-radius: 4px;
  background-color: #000;

  align-items: center;
  justify-content: center;
`;

export const CameraButton = styled(RectButton)`
  height: 60px;
  width: 60px;
  background-color: #000;
  opacity: 0.6;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  margin-bottom: 20px;
`;

export const TakePhotoIcon = styled(Icon).attrs({
  name: 'photo-camera',
  size: 30,
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
  size: 30,
  color: '#f55',
})``;

import React, { useRef } from 'react';
import { RNCamera } from 'react-native-camera';

import {
  CameraContainer,
  CameraButton,
  CameraIcon,
  ActivityIndicator,
} from './styles';

export default function Camera() {
  const cameraRef = useRef(null);

  const androidCameraPermissionOptions = {
    title: 'Permissão para usar a câmera',
    message: 'Precisamos da sua permissão para usar a câmera',
    buttonPositive: 'Permitir',
    buttonNegative: 'Negar',
  };

  async function takePicture() {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        pauseAfterCapture: true,
      };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        console.tron.log(data.uri);
      } catch (error) {
        console.tron.log(error);
      }
    }
  }

  return (
    <CameraContainer>
      <RNCamera
        ref={cameraRef}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        androidCameraPermissionOptions={androidCameraPermissionOptions}
        captureAudio={false}
        playSoundOnCapture
      >
        {({ status }) =>
          status !== 'READY' ? (
            <ActivityIndicator />
          ) : (
            <CameraButton onPress={takePicture}>
              <CameraIcon />
            </CameraButton>
          )
        }
      </RNCamera>
    </CameraContainer>
  );
}

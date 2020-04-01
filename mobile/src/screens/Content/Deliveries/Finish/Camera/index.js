import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';

import {
  CameraContainer,
  CameraButton,
  TakePhotoIcon,
  ActivityIndicator,
  CancelIcon,
} from './styles';

export default function Camera() {
  const cameraRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  const androidCameraPermissionOptions = {
    title: 'Permissão para usar a câmera',
    message: 'Precisamos da sua permissão para usar a câmera',
    buttonPositive: 'Permitir',
    buttonNegative: 'Negar',
  };

  function resumePreview() {
    setCaptured(false);
    setPhotoData(null);

    cameraRef.current.resumePreview();
  }

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
        setCaptured(true);
        setPhotoData(data);
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
            <CameraButton
              onPress={() => (captured ? resumePreview() : takePicture())}
            >
              {captured ? <CancelIcon /> : <TakePhotoIcon />}
            </CameraButton>
          )
        }
      </RNCamera>
    </CameraContainer>
  );
}

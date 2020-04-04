import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';

import {
  CameraButton,
  TakePhotoIcon,
  ActivityIndicator,
  CancelIcon,
} from './styles';

export default function Camera({ onTake, onDiscard }) {
  const cameraRef = useRef(null);
  const [alreadyCaptured, setAlreadyCaptured] = useState(false);

  const androidCameraPermissionOptions = {
    title: 'Permissão para usar a câmera',
    message: 'Precisamos da sua permissão para usar a câmera',
    buttonPositive: 'Permitir',
    buttonNegative: 'Negar',
  };

  function discardAndResumePreview() {
    setAlreadyCaptured(false);
    onDiscard();

    cameraRef.current.resumePreview();
  }

  async function takePicture() {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        base64: true,
        pauseAfterCapture: true,
        width: 450,
      };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        setAlreadyCaptured(true);
        onTake(data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao capturar imagem, tente novamente.');
      }
    }
  }

  return (
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
      {({ camera, status }) => {
        if (status !== 'READY') {
          return <ActivityIndicator />;
        }

        // Bug workaround when camera is remounted after a capture (or screen is turned off)
        if (alreadyCaptured) {
          camera.pausePreview();
        }

        return (
          <CameraButton
            onPress={() =>
              alreadyCaptured ? discardAndResumePreview() : takePicture()
            }
          >
            {alreadyCaptured ? <CancelIcon /> : <TakePhotoIcon />}
          </CameraButton>
        );
      }}
    </RNCamera>
  );
}

Camera.propTypes = {
  onTake: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
};

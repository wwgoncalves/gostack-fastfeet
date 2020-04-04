import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';

import { Container, CameraContainer } from './styles';

import Camera from '~/components/Camera';
import Button from '~/components/Button';

export default function Finish() {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [sending, setSending] = useState(false);

  function handlePhotoTaken(data) {
    setIsPhotoTaken(true);
    setPhotoData(data);
    console.tron.log(data);
  }

  function handlePhotoDiscarded() {
    setIsPhotoTaken(false);
    setPhotoData(null);
  }

  function submitPhoto() {
    setSending(true);

    // photoData ...

    setSending(false);
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  return (
    <Container>
      <CameraContainer>
        {/* <Text>Finish the delivery</Text> */}
        <Camera onTake={handlePhotoTaken} onDiscard={handlePhotoDiscarded} />
      </CameraContainer>
      <Button loading={sending} disabled={!isPhotoTaken} onPress={submitPhoto}>
        Enviar
      </Button>
    </Container>
  );
}

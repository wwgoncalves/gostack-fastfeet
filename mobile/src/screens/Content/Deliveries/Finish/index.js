import React, { useState } from 'react';

import { Container, CameraContainer } from './styles';

import Camera from './Camera';
import Button from '~/components/Button';

export default function Finish() {
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [photoData, setPhotoData] = useState(null);

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
    // photoData ...
  }

  return (
    <Container>
      <CameraContainer>
        {/* <Text>Finish the delivery</Text> */}
        <Camera onTake={handlePhotoTaken} onDiscard={handlePhotoDiscarded} />
      </CameraContainer>
      <Button disabled={!isPhotoTaken} onPress={submitPhoto}>
        Enviar
      </Button>
    </Container>
  );
}

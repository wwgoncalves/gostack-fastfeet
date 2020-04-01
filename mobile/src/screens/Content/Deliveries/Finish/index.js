import React from 'react';

import { Container } from './styles';

import Camera from './Camera';
import Button from '~/components/Button';

export default function Finish() {
  return (
    <Container>
      {/* <Text>Finish the delivery</Text> */}
      <Camera />
      <Button inactive>Enviar</Button>
    </Container>
  );
}

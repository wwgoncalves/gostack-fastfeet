import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Container, CameraContainer } from './styles';

import api from '~/services/api';

import Camera from '~/components/Camera';
import Button from '~/components/Button';

export default function Finish({ route, navigation }) {
  const { deliveryId } = route.params;
  const profile = useSelector((state) => state.user.profile);

  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [sending, setSending] = useState(false);

  function handlePhotoTaken(data) {
    setIsPhotoTaken(true);
    setPhotoData(data);
    // console.tron.log(data);
  }

  function handlePhotoDiscarded() {
    setIsPhotoTaken(false);
    setPhotoData(null);
  }

  async function submitPhoto() {
    if (!isPhotoTaken) return;

    let errorOccurred = false;
    setSending(true);

    try {
      // photoData ...
      const photoFilename = photoData.uri.split('/').pop();
      const file = {
        uri: photoData.uri,
        name: photoFilename,
        type: 'image/jpeg',
        originalname: photoFilename,
      };
      const data = new FormData();
      data.append('file', file);

      // console.tron.log('data: ', data);
      // console.tron.log('ENVIANDO FOTO...');
      const response = await api.post(`deliverymen/${profile.id}/files`, data);
      // const response = await fetch(
      //   `${api.defaults.baseURL}/deliverymen/${profile.id}/files`,
      //   {
      //     method: 'POST',
      //     body: data,
      //   }
      // );

      // console.tron.log('RES: ', response);

      const photoId = response.data.id;

      // return;

      // console.tron.log('CONFIRMANDO ENTREGA...');
      await api.put(`deliverymen/${profile.id}/deliveries/${deliveryId}`, {
        end_date: new Date(),
        signature_id: photoId,
      });

      Snackbar.show({
        text: 'Entrega confirmada.',
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {
      // console.tron.log('Error: ', error);
      errorOccurred = true;
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Falha na confirmação', error.response.data.error);
      } else {
        Alert.alert(
          'Falha na confirmação',
          'Houve um erro no envio e na confirmação da entrega. Tente novamente.'
        );
      }
    }

    setSending(false);
    if (!errorOccurred) {
      navigation.goBack();
    }
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
        <Camera onTake={handlePhotoTaken} onDiscard={handlePhotoDiscarded} />
      </CameraContainer>
      <Button loading={sending} disabled={!isPhotoTaken} onPress={submitPhoto}>
        Enviar
      </Button>
    </Container>
  );
}

Finish.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

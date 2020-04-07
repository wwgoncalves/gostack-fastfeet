import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Keyboard, Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { Container, Form, Input } from './styles';

import api from '~/services/api';

import Button from '~/components/Button';

export default function Report({ route, navigation }) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  const [deliveryId] = useState(route.params.deliveryId);
  const [problemDescription, setProblemDescription] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit() {
    Keyboard.dismiss();

    if (!problemDescription) return;

    let errorOccurred = false;
    setSending(true);

    try {
      await api.post(`deliveries/${deliveryId}/problems`, {
        description: problemDescription,
      });

      Snackbar.show({
        text: 'Problema cadastrado.',
        duration: Snackbar.LENGTH_LONG,
      });
      setProblemDescription('');
    } catch (error) {
      errorOccurred = true;
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Erro ao cadastrar problema', error.response.data.error);
      } else {
        Alert.alert('Erro ao cadastrar problema', 'Tente novamente em breve.');
      }
    }

    setSending(false);
    if (!errorOccurred) {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <Form>
        <Input
          value={problemDescription}
          onSubmitEditing={handleSubmit}
          onChangeText={setProblemDescription}
        />
        <Button
          loading={sending}
          disabled={!problemDescription}
          onPress={handleSubmit}
        >
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

Report.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

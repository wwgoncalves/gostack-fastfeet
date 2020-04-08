import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import { Container, Logo, Form, Input } from './styles';

import { signInRequest } from '~/store/modules/user/actions';

import Button from '~/components/Button';
import StatusBar from '~/components/StatusBar';

export default function SignIn() {
  const dispatch = useDispatch();
  const [deliverymanId, setDeliverymanId] = useState('');
  const loading = useSelector((state) => state.user.loading);

  function handleSubmit() {
    Keyboard.dismiss();
    dispatch(signInRequest(deliverymanId));
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar('purple');
    }, [])
  );

  return (
    <Container>
      <Logo />

      <Form>
        <Input
          value={deliverymanId}
          onSubmitEditing={handleSubmit}
          onChangeText={setDeliverymanId}
        />
        <Button
          loading={loading}
          backgroundColor="#82bf18"
          onPress={handleSubmit}
        >
          Entrar no sistema
        </Button>
      </Form>
    </Container>
  );
}

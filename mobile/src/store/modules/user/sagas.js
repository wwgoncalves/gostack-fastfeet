import { Alert } from 'react-native';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymen/${id}`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (error) {
    if (
      error.message &&
      String(error.message).toLowerCase() === 'network error'
    ) {
      Alert.alert('Falha na conexão', 'Tente novamente em breve.');
    } else {
      Alert.alert('Falha no login', 'Verifique seu ID e tente novamente.');
    }
    yield put(signInFailure());
  }
}

export default all([takeLatest('@user/SIGN_IN_REQUEST', signIn)]);

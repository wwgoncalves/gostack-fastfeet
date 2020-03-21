/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.'),
  password: Yup.string().required('Senha obrigatória.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="FastFeet logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">
          SEU E-MAIL
          <Input
            name="email"
            id="email"
            type="text"
            placeholder="exemplo@email.com"
          />
        </label>
        <label htmlFor="password">
          SUA SENHA
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="*************"
          />
        </label>

        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </>
  );
}

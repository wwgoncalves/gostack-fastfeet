import React from 'react';

import logo from '~/assets/fastfeet-logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="FastFeet logo" />

      <form>
        <label htmlFor="email">
          SEU E-MAIL
          <input id="email" type="text" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          SUA SENHA
          <input id="password" type="password" placeholder="*************" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}

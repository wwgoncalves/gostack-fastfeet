import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Logo } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div>
        <Logo />
        <nav>
          <NavLink to="/deliveries">ENCOMENDAS</NavLink>
          <NavLink to="/deliverymen">ENTREGADORES</NavLink>
          <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
          <NavLink to="/problems">PROBLEMAS</NavLink>
        </nav>
      </div>
      <aside>
        <strong>{profile.name}</strong>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}

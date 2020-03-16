import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Logo } from './styles';

export default function Header() {
  const profile = {
    name: 'Administrador FastFeet',
  };

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
        <button type="button">sair do sistema</button>
      </aside>
    </Container>
  );
}

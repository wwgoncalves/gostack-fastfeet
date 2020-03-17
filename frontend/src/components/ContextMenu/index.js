import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, MenuButton, Menu, Action } from './styles';

export default function ContextMenu({ actions, contextId }) {
  const [visible, setVisible] = useState(true);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <MenuButton onClick={handleToggleVisible}>
        <MdMoreHoriz size={24} color="#c6c6c6" />
      </MenuButton>
      <Menu visible={visible}>
        {actions.map(action => (
          <Action key={String(action.id)} onClick={() => action.fn(contextId)}>
            {action.icon}
            {action.label}
          </Action>
        ))}
      </Menu>
    </Container>
  );
}

ContextMenu.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  contextId: PropTypes.number.isRequired,
};

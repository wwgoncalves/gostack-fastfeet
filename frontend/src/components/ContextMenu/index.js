import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, MenuButton, Menu, Action } from './styles';

export default function ContextMenu({ menuActions, contextId }) {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  function handleVisibilityToggle() {
    setVisible(!visible);
  }

  function handleHiddenness() {
    setVisible(false);
  }

  useEffect(() => {
    if (visible) {
      menuRef.current.focus();
    }
  }, [visible]);

  return (
    <Container>
      <MenuButton
        onMouseDown={e => e.preventDefault()}
        onClick={handleVisibilityToggle}
      >
        <MdMoreHoriz size={24} color="#c6c6c6" />
      </MenuButton>
      <Menu
        visible={visible}
        ref={menuRef}
        onBlur={() => (visible ? handleHiddenness() : false)}
      >
        {menuActions.map(action => (
          <Action
            key={String(action.id)}
            onMouseDown={e => e.preventDefault()}
            onClick={() => action.fn(contextId)}
          >
            {action.icon}
            {action.label}
          </Action>
        ))}
      </Menu>
    </Container>
  );
}

ContextMenu.propTypes = {
  menuActions: PropTypes.arrayOf(PropTypes.object).isRequired,
  contextId: PropTypes.number.isRequired,
};

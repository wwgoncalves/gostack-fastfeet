import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    // Prevents browser scrolling
    document.body.style.overflow = 'hidden';
    return function resetBodyStyle() {
      document.body.style.overflow = null;
    };
  }, []);

  function closeModal() {
    onClose();
  }

  return <Container onClick={closeModal}>{children}</Container>;
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

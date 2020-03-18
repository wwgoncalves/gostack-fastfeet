import React from 'react';
import PropTypes from 'prop-types';
import { MdSync } from 'react-icons/md';

import { Container } from './styles';

export default function LoadingIndicator({ size, color }) {
  return (
    <Container size={size}>
      <MdSync size={size} color={color} />
    </Container>
  );
}

LoadingIndicator.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

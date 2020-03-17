import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

const statuses = {
  0: {
    bgColor: '#F0F0DF',
    color: '#C1BC35',
    label: 'Pendente',
  },
  1: {
    bgColor: '#BAD2FF',
    color: '#4D85EE',
    label: 'Retirada',
  },
  2: {
    bgColor: '#DFF0DF',
    color: '#2CA42B',
    label: 'Entregue',
  },
  9: {
    bgColor: '#FAB0B0',
    color: '#DE3B3B',
    label: 'Cancelada',
  },
};

export default function StatusTag({ code }) {
  const { bgColor, color, label } = statuses[code];

  return (
    <Container bgColor={bgColor} color={color}>
      <span />
      {label}
    </Container>
  );
}

StatusTag.propTypes = {
  code: PropTypes.number.isRequired,
};

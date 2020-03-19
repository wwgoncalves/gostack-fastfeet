import React from 'react';
import PropTypes from 'prop-types';

import { AvatarCircle } from './styles';

export default function AvatarPlaceholder({ size, name, children }) {
  const colorByLetter = {
    A: '#e47867',
    B: '#629030',
    C: '#cc4ccd',
    D: '#83cec9',
    E: '#a41724',
    F: '#ec7d6f',
    G: '#cb946c',
    H: '#611e19',
    I: '#c39488',
    J: '#a28fd0',
    K: '#4bab36',
    L: '#323a95',
    M: '#a8d080',
    N: '#72a451',
    O: '#cd4747',
    P: '#8194d9',
    Q: '#585cca',
    R: '#cccc8B',
    S: '#a5aed4',
    T: '#cc7584',
    U: '#975632',
    V: '#9b20fa',
    W: '#327bed',
    X: '#a05c3d',
    Y: '#dd57ec',
    Z: '#8c6054',
    default: '#f1a59d',
  };

  let initials = '';
  const names = name.split(' ');
  if (names.length === 1) {
    initials = String(names[0][0]).toUpperCase();
  } else {
    initials = `${String(names[0][0])}${String(
      names[names.length - 1][0]
    )}`.toUpperCase();
  }

  const color = colorByLetter[initials[0]] || colorByLetter.default;

  return (
    <>
      <AvatarCircle size={size} color={color}>
        {initials}
      </AvatarCircle>
      {children && <span>{children}</span>}
    </>
  );
}

AvatarPlaceholder.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
};

AvatarPlaceholder.defaultProps = {
  children: null,
};

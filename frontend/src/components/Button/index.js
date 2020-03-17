import React from 'react';
import PropTypes from 'prop-types';
import * as Md from 'react-icons/md';

import { Container } from './styles';

export default function Button({ bgColor, color, icon, text }) {
  const MdIcon = icon && Md[icon];

  return (
    <Container bgColor={bgColor} color={color}>
      {icon && (
        <span>
          <MdIcon size={24} color={color} />
        </span>
      )}
      {text}
    </Container>
  );
}

Button.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
};

Button.defaultProps = {
  bgColor: '#7d40e7',
  color: '#fff',
  icon: null,
  text: '',
};

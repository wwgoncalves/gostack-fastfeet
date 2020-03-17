import React from 'react';
import PropTypes from 'prop-types';
import * as Md from 'react-icons/md';

import { Container } from './styles';

export default function Button({ bgColor, icon, text }) {
  const MdIcon = icon && Md[icon];

  return (
    <Container bgColor={bgColor}>
      {icon && (
        <span>
          <MdIcon size={24} color="#fff" />
          &nbsp;
        </span>
      )}
      {text}
    </Container>
  );
}

Button.propTypes = {
  bgColor: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
};

Button.defaultProps = {
  bgColor: '#7d40e7',
  icon: null,
  text: '',
};

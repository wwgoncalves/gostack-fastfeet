import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({
  backgroundColor,
  textColor,
  children,
  ...rest
}) {
  return (
    <Container backgroundColor={backgroundColor} {...rest}>
      <Text textColor={textColor}>{children}</Text>
    </Container>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  backgroundColor: '#7d40e7',
  textColor: '#fff',
};

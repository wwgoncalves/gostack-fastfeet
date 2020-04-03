import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({
  backgroundColor,
  textColor,
  disabled,
  loading,
  children,
  ...rest
}) {
  return (
    <Container backgroundColor={backgroundColor} disabled={disabled} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text textColor={textColor} disabled={disabled}>
          {children}
        </Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  backgroundColor: '#7d40e7',
  textColor: '#fff',
  disabled: false,
  loading: false,
};

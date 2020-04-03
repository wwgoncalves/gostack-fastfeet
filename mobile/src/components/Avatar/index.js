import React from 'react';
import PropTypes from 'prop-types';

import { RoundedImage } from './styles';

export default function Avatar({ size, ...rest }) {
  return <RoundedImage size={size} {...rest} />;
}

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
};

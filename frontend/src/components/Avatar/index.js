import React from 'react';
import PropTypes from 'prop-types';

import { Circle } from './styles';

import AvatarPlaceholder from '~/components/AvatarPlaceholder';

export default function Avatar({ url, size, name, children }) {
  return (
    <>
      {url ? (
        <Circle size={size}>
          <img src={url} alt="Avatar do entregador" />
        </Circle>
      ) : (
        <AvatarPlaceholder size={size} name={name} />
      )}
      {children && <span>{children}</span>}
    </>
  );
}

Avatar.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
};

Avatar.defaultProps = {
  children: null,
};

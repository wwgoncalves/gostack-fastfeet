import React from 'react';
import PropTypes from 'prop-types';
import * as Md from 'react-icons/md';

import { Container } from './styles';

export default function Button({
  bgColor,
  color,
  icon,
  iconOnTheRight,
  text,
  onClick,
  disabled,
  title,
}) {
  const MdIcon = icon && Md[icon];

  return (
    <Container
      bgColor={bgColor}
      color={color}
      onClick={onClick}
      iconOnTheRight={iconOnTheRight}
      disabled={disabled}
      title={title}
    >
      {icon && !iconOnTheRight && (
        <span>
          <MdIcon size={24} color={color} />
        </span>
      )}
      {text}
      {icon && iconOnTheRight && (
        <span>
          <MdIcon size={24} color={color} />
        </span>
      )}
    </Container>
  );
}

Button.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  iconOnTheRight: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

Button.defaultProps = {
  bgColor: '#7d40e7',
  color: '#fff',
  icon: null,
  text: '',
  onClick: null,
  iconOnTheRight: false,
  disabled: false,
  title: null,
};

import React from 'react';
import PropTypes from 'prop-types';
import * as Md from 'react-icons/md';

import { Container } from './styles';

export default function Button({
  type,
  bgColor,
  color,
  icon,
  iconOnTheRight,
  text,
  onClick,
  disabled,
  title,
  active,
  form,
}) {
  const MdIcon = icon && Md[icon];

  return (
    <Container
      type={type}
      bgColor={bgColor}
      color={color}
      onClick={onClick}
      iconOnTheRight={iconOnTheRight}
      disabled={disabled}
      title={title}
      active={active}
      form={form}
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
  type: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  iconOnTheRight: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  active: PropTypes.bool,
  form: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  bgColor: '#7d40e7',
  color: '#fff',
  icon: null,
  text: '',
  onClick: null,
  iconOnTheRight: false,
  disabled: false,
  title: null,
  active: false,
  form: null,
};

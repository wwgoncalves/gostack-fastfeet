import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.button.attrs({
  type: 'button',
})`
  height: 36px;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding: 0 15px;

  span {
    height: 24px;
    ${props =>
      props.iconOnTheRight
        ? css`
            margin-left: 5px;
          `
        : css`
            margin-right: 5px;
          `}
  }

  ${props =>
    props.disabled
      ? css`
          background-color: ${lighten(0.15, props.bgColor)};
          color: ${lighten(0.15, props.color)};
          cursor: not-allowed;
        `
      : css`
          background-color: ${props.bgColor};
          color: ${props.color};
          transition: background-color 0.2s;

          &:hover {
            background-color: ${darken(0.1, props.bgColor)};
          }
        `}
`;

import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

export const AvatarCircle = styled.Text`
  text-align: center;
  /* vertical-align: middle; */
  text-transform: uppercase;
  ${(props) =>
    css`
      width: ${props.size}px;
      line-height: ${props.size}px;
      font-size: ${Math.floor(props.size / 2 - 1)}px;
      color: ${darken(0.1, props.color)};
      background-color: ${lighten(0.22, props.color)};
      border-radius: ${Math.floor(props.size / 2)}px;
    `}
`;

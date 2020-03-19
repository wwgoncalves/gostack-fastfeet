import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const AvatarCircle = styled.span`
  display: inline-block !important;
  text-align: center;
  /* vertical-align: middle; */
  text-transform: uppercase;
  ${props =>
    css`
      width: ${props.size}px;
      line-height: ${props.size}px;
      font-size: ${Math.floor(props.size / 2 - 1)}px;
      color: ${props.color};
      background-color: ${lighten(0.25, props.color)};
    `}
  border-radius: 50%;

  & + span {
    margin-left: 5px;
  }
`;

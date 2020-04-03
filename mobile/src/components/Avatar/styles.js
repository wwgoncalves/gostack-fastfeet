import styled, { css } from 'styled-components/native';

export const RoundedImage = styled.Image`
  ${(props) =>
    css`
      width: ${props.size}px;
      height: ${props.size}px;
      border-radius: ${Math.floor(props.size / 2)}px;
    `}
`;

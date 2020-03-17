import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button.attrs({
  type: 'button',
})`
  height: 36px;
  background-color: ${props => props.bgColor};
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding: 0 15px;

  span {
    height: 24px;
  }

  &:hover {
    background-color: ${props => darken(0.05, props.bgColor)};
  }
`;

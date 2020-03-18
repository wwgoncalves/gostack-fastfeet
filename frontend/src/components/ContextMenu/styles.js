import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  background-color: #fff;
  border-radius: 4px;

  &:hover {
    svg {
      fill: #666;
    }
  }
`;

export const Menu = styled.div.attrs({
  tabIndex: -1,
})`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 7px);
  background-color: #fff;
  border: 0;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  padding: 10px 10px;
  display: ${props => (props.visible ? 'flex !important' : 'none !important')};
  flex-direction: column !important;
  align-items: flex-start !important;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 5px);
    top: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    filter: drop-shadow(0px -1px 2px rgba(0, 0, 0, 0.15));
  }
`;

export const Action = styled.button`
  align-self: stretch;
  background-color: #fff;
  color: #999;
  font-size: 16px;
  border: 0;
  padding: 8px 0;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }

  & + button {
    border-top: 1px solid #eee;
  }

  &:hover {
    background-color: ${() => darken(0.05, '#fff')};
  }
`;

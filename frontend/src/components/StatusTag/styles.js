import styled from 'styled-components';

export const Container = styled.span`
  width: 110px;
  height: 25px;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;

  span {
    width: 10px;
    height: 10px;
    background-color: ${props => props.color};
    border-radius: 50%;
    margin-right: 5px;
  }
`;

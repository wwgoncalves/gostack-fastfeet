import styled from 'styled-components';

export const Circle = styled.span`
  display: inline-block !important;
  text-align: center;
  vertical-align: middle;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  img {
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 50%;
  }

  & + span {
    margin-left: 5px;
  }
`;

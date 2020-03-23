import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;

  body:not(&) {
    background-color: #f5f5f5;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 83%;
  margin: 0 auto;
  flex-direction: column;
`;

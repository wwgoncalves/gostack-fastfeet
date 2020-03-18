import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center !important;

  button {
    & + button {
      margin-left: 10px;
    }
  }
`;

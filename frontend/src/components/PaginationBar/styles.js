import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between !important;

  /* div {
    display: flex;
    align-items: center;
    justify-content: center !important;

    button {
      & + button {
        margin-left: 10px;
      }
    }
  } */
`;

export const PageSizes = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start !important;

  button {
    & + button {
      margin-left: 5px;
    }
  }
`;

export const Pagination = styled.div`
  flex-grow: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end !important;

  button {
    & + button {
      margin-left: 5px;
    }
  }
`;

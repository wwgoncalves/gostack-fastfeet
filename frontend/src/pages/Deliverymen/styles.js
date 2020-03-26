import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 34px 0;
    font-size: 24px;
    color: #444;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }
`;

export const NoContentMessage = styled.div`
  width: 100%;
  height: 57px;
  background-color: #fff;
  border-radius: 4px;
  color: #666;
  font-size: 16px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center !important;
`;

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

export const ModalContent = styled.div`
  width: 450px;
  height: 360px;
  padding: 25px;
  position: absolute;
  top: calc(50vh - 180px);
  left: calc(50% - 225px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);

  div {
    line-height: 1.6;

    h4 {
      font-size: 14px;
      font-weight: bold;
      color: #444;
    }

    span {
      font-size: 16px;
      font-weight: normal;
      color: #666;
    }
  }
`;

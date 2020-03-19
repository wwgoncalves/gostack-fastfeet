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
    justify-content: space-between;
    margin-bottom: 22px;
  }
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

  h2 {
    font-weight: bold;
    color: #444;
  }

  span,
  div {
    color: #666;
  }
`;

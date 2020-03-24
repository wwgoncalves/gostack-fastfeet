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

    div {
      width: 405px;
      height: 75px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: rgba(125, 64, 231, 0.5);
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 4px;
        border: 1px solid #666;
      }
    }
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #eee;
    margin: 10px 0;
  }
`;

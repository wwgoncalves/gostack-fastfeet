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

export const SearchAndFilter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 !important;

  input[type='checkbox'] {
    margin-left: 20px;
    transform: scale(1.3);
  }

  label {
    height: 36px;
    display: flex;
    align-items: center;
    font-weight: bold;
    text-transform: uppercase;
    padding-left: 10px;
    padding-right: 20px;
    color: #999;
  }
  #problems:checked ~ label[for='problems'] {
    color: #7d40e7;
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

    div {
      width: 400px;
      height: 75px;
      display: flex;
      overflow: auto;

      img {
        margin: auto;
      }

      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #eee;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #7d40e7;
        border-radius: 4px;
      }

      &:hover::-webkit-scrollbar {
        width: 5px;
        height: 5px;
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

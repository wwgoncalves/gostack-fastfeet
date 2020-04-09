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
  height: auto;
  padding: 25px;
  position: absolute;
  top: 30%;
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
      margin-bottom: 5px;
    }

    span {
      font-size: 16px;
      font-weight: normal;
      color: #666;
    }

    div {
      position: relative;
      width: 400px;
      height: 75px;
      display: flex;
      overflow: auto;

      img {
        margin: auto;
      }

      button {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        height: auto;
        padding: 0;
        margin: 0;
        span {
          padding: 0;
          margin: 0;
          svg {
            padding: 0;
            margin: 0;
          }
        }
      }

      &:hover {
        button {
          display: flex;
        }
      }

      &::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: #eee;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #7d40e7aa;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #7d40e7;
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

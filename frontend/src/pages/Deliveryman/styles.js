import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;
  flex-grow: 1;
  /* margin: 0 10%; */
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 34px 0;

    h1 {
      font-size: 24px;
      color: #444;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;

      button {
        & + button {
          margin-left: 15px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 30px;

  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #444;

      input {
        align-self: stretch;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        margin: 10px 0 15px;
        font-size: 16px;
        color: #444;

        &::placeholder {
          color: #999;
        }
      }

      span {
        color: #ff1188;
        align-self: flex-end;
        margin-top: 8px;
        padding-right: 2px;
        font-weight: bold;
        position: absolute;
      }
    }
  }
`;

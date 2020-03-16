import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background-color: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding: 30px;

  img {
    width: 100%;
    max-width: 260px;
    margin: 30px 0 40px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: bold;

      input {
        align-self: stretch;
        border: 1px solid #ddd;
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        margin: 10px 0 15px;
        font-size: 16px;

        &::placeholder {
          color: #999;
        }
      }
    }

    button {
      height: 45px;
      background-color: #7d40e7;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      margin: 0 0 30px;
      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.05, '#7d40e7')};
      }
    }
  }
`;

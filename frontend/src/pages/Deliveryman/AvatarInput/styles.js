import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin: 30px;
  display: flex;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 1px dashed #ddd;
      background: #fff;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 2px dashed #ddd;
      background: #fff;
      font-size: 16px;
      font-weight: bold;
      color: #ddd;
    }

    input {
      display: none;
    }
  }
`;

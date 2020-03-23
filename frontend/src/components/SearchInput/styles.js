import styled from 'styled-components';

export const Container = styled.div`
  width: 237px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin: 0 !important;

  span {
    height: 24px;
  }

  input {
    flex: 1;
    border: 0;
    margin-left: 10px;
    color: #444;

    &::placeholder {
      color: #999;
    }
  }
`;

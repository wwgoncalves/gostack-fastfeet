import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  thead tr,
  tbody tr {
    height: 57px;
  }
  thead tr:first-child {
    height: 20px;
  }

  th {
    text-align: left;
    color: #444;
    font-size: 16px;
  }
  th:first-child {
    padding-left: 25px;
  }
  th:last-child {
    text-align: center;
    padding-right: 25px;
  }

  td {
    background-color: #fff;
    color: #666;
    font-size: 16px;
  }
  td:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 25px;
  }
  td:last-child {
    text-align: center;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    padding-right: 25px;
  }
`;

import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './styles';

export default function DataTable({ header, dataArray }) {
  let currentRow = 0;

  function rowNumber() {
    currentRow += 1;
    return currentRow;
  }

  return (
    <Table>
      <thead>
        <tr key={rowNumber()}>
          {header.map(cell => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataArray.map(row => (
          <tr key={rowNumber()}>
            {row.map(value => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

DataTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataArray: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func])
    )
  ).isRequired,
};

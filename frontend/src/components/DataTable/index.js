import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './styles';

export default function DataTable({ header, dataArray }) {
  let rowsCounter = 0;
  let cellsCounter = 0;

  function countRow() {
    rowsCounter += 1;
    return rowsCounter;
  }

  function countCell() {
    cellsCounter += 1;
    return cellsCounter;
  }

  return (
    <Table>
      <thead>
        <tr key={String(countRow())}>
          {header.map(cell => (
            <th key={String(countCell())}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataArray.map(row => (
          <tr key={String(countRow())}>
            {row.map(value => (
              <td key={String(countCell())}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

DataTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataArray: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element,
          PropTypes.func,
        ])
      )
    ),
    PropTypes.array,
  ]).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Button from '~/components/Button';

export default function PaginationBar({ info, onPageChange }) {
  // and onSizePageChange ???
  const pagesRange = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <>
      {info.last > 0 && (
        <Container>
          <Button icon="MdFirstPage" onClick={() => onPageChange(1)} />
          <Button
            icon="MdChevronLeft"
            text="Anterior"
            disabled={info.current - 1 < 1}
            onClick={() => onPageChange(info.current - 1)}
          />
          {pagesRange.map(number => {
            if (
              !(info.current + number < 1 || info.current + number > info.last)
            ) {
              const text = String(info.current + number);
              const bgColor = number === 0 ? '#999' : '#ccc';
              const onClick =
                number === 0 ? null : () => onPageChange(info.current + number);
              return (
                <Button
                  key={String(number)}
                  bgColor={bgColor}
                  text={text}
                  onClick={onClick}
                />
              );
            }
            return null;
          })}
          <Button
            icon="MdChevronRight"
            iconOnTheRight
            text="Próxima"
            disabled={info.current + 1 > info.last}
            onClick={() => onPageChange(info.current + 1)}
          />
          <Button
            icon="MdLastPage"
            iconOnTheRight
            onClick={() => onPageChange(info.last)}
          />
        </Container>
      )}
    </>
  );
}

PaginationBar.propTypes = {
  info: PropTypes.objectOf(PropTypes.number).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

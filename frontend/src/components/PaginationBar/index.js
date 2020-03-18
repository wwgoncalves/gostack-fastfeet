import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Button from '~/components/Button';

export default function PaginationBar({ info, onPageChange }) {
  // and onSizePageChange ???
  return (
    <>
      {info.last > 0 && (
        <Container>
          <Button icon="MdFirstPage" onClick={() => onPageChange(1)} />
          <Button
            icon="MdChevronLeft"
            text="Anterior"
            disabled
            onClick={() => onPageChange(info.current - 1)}
          />
          <Button bgColor="#999" text={String(info.current)} />
          <Button
            bgColor="#ccc"
            text={String(info.current + 1)}
            onClick={() => onPageChange(info.current + 1)}
          />
          <Button
            bgColor="#ccc"
            text={String(info.current + 2)}
            onClick={() => onPageChange(info.current + 2)}
          />
          <Button
            icon="MdChevronRight"
            iconOnTheRight
            text="Próxima"
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

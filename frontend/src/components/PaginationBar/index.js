import React from 'react';
import PropTypes from 'prop-types';

import { Container, PageSizes, Pagination } from './styles';
import Button from '~/components/Button';

export default function PaginationBar({
  info,
  onPageChange,
  onPageSizeChange,
}) {
  const pageSizes = [10, 25, 50];
  const pageRanges = [-2, -1, 0, 1, 2];

  return (
    <>
      {info.last > 1 && (
        <Container>
          <PageSizes title="Itens por página">
            {pageSizes.map(size => {
              const onClick =
                size === info.size ? null : () => onPageSizeChange(size);
              const active = size === info.size;
              return (
                <Button
                  key={String(size)}
                  text={String(size)}
                  onClick={onClick}
                  active={active}
                />
              );
            })}
          </PageSizes>
          <Pagination>
            <Button
              icon="MdFirstPage"
              disabled={info.current === 1}
              onClick={() => onPageChange(1)}
              title="Página 1"
            />
            <Button
              icon="MdChevronLeft"
              disabled={info.current - 1 < 1}
              onClick={() => onPageChange(info.current - 1)}
              title="Anterior"
            />
            {pageRanges.map(range => {
              if (
                !(info.current + range < 1 || info.current + range > info.last)
              ) {
                const text = String(info.current + range);
                const onClick =
                  range === 0 ? null : () => onPageChange(info.current + range);
                const active = range === 0;
                return (
                  <Button
                    key={String(range)}
                    bgColor="#ccc"
                    text={text}
                    onClick={onClick}
                    active={active}
                  />
                );
              }
              return null;
            })}
            <Button
              icon="MdChevronRight"
              iconOnTheRight
              disabled={info.current + 1 > info.last}
              onClick={() => onPageChange(info.current + 1)}
              title="Próxima"
            />
            <Button
              icon="MdLastPage"
              iconOnTheRight
              disabled={info.current === info.last}
              onClick={() => onPageChange(info.last)}
              title={`Página ${info.last}`}
            />
          </Pagination>
        </Container>
      )}
    </>
  );
}

PaginationBar.propTypes = {
  info: PropTypes.objectOf(PropTypes.number).isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

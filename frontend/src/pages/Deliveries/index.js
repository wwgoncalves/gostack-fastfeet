import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

import { Container } from './styles';

import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';

export default function Deliveries() {
  const header = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];
  const dataArray = [
    [
      '#01',
      'Ludwig van Beethoven',
      'John Doe',
      'Rio do Sul',
      'Santa Catarina',
      'ENTREGUE',
      <MdMoreHoriz size={24} color="#c6c6c6" />,
    ],
    [
      '#02',
      'Wolfgang Amadeus',
      'Gaspar Antunes',
      'Rio do Sul',
      'Santa Catarina',
      'PENDENTE',
      <MdMoreHoriz size={24} color="#c6c6c6" />,
    ],
  ];

  return (
    <Container>
      <h1>Gerenciando encomendas</h1>
      <div>
        <SearchInput placeholder="Buscar por encomendas" />
        <Button icon="MdAdd" text="Cadastrar" />
      </div>
      <DataTable header={header} dataArray={dataArray} />
    </Container>
  );
}

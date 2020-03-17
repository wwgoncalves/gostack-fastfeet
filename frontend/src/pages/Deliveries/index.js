import React from 'react';
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import { Container } from './styles';

import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import StatusTag from '~/components/StatusTag';
import ContextMenu from '~/components/ContextMenu';

export default function Deliveries() {
  function test(id) {
    window.alert(id);
  }

  const header = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];
  const actions = [
    {
      id: 1,
      icon: <MdVisibility size={16} color="#8E5BE8" />,
      label: 'Visualizar',
      fn: test,
    },
    {
      id: 2,
      icon: <MdCreate size={16} color="#4D85EE" />,
      label: 'Editar',
      fn: test,
    },
    {
      id: 3,
      icon: <MdDeleteForever size={16} color="#DE3B3B" />,
      label: 'Excluir',
      fn: test,
    },
  ];
  const dataArray = [
    [
      '#01',
      'Ludwig van Beethoven',
      'John Doe',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={2} />,
      <ContextMenu actions={actions} contextId={1} />,
    ],
    [
      '#02',
      'Wolfgang Amadeus',
      'Gaspar Antunes',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={0} />,
      <MdMoreHoriz size={24} color="#c6c6c6" />,
    ],
    [
      '#03',
      'Johann Sebastian Bach',
      'Dai Jiang',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={1} />,
      <MdMoreHoriz size={24} color="#c6c6c6" />,
    ],
    [
      '#04',
      'Frédéric Chopin',
      'Tom Hanson',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={9} />,
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

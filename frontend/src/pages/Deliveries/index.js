import React, { useState, useEffect } from 'react';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';

import { Container, ModalContent } from './styles';

import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import StatusTag from '~/components/StatusTag';
import ContextMenu from '~/components/ContextMenu';
import PaginationBar from '~/components/PaginationBar';
import LoadingIndicator from '~/components/LoadingIndicator';
import Modal from '~/components/Modal';

export default function Deliveries() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  function visualize(id) {
    console.log(`visualize() should be implemented - ${id}`);

    setModalVisible(true);
    setModalContent(
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Isto é apenas um teste</h2>
        <div>um dois três</div>
        <span>...ID: {id}...</span>
      </ModalContent>
    );
  }
  function edit(id) {
    console.log(`edit() should be implemented - ${id}`);
  }
  function remove(id) {
    console.log(`remove() should be implemented - ${id}`);
  }
  function handleModalClose() {
    setModalVisible(false);
    setModalContent(null);
  }

  const [loading, setLoading] = useState(false);
  function loadData() {
    console.log(`loadData() should be implemented`);

    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    size: 5,
    last: 27,
  });
  function onPageChange(page) {
    console.log(`onPageChange() should be implemented - ${page}`);

    setPaginationInfo({ ...paginationInfo, current: page });
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  const tableHeader = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];
  const menuActions = [
    {
      id: 1,
      icon: <MdVisibility size={16} color="#8E5BE8" />,
      label: 'Visualizar',
      fn: visualize,
    },
    {
      id: 2,
      icon: <MdCreate size={16} color="#4D85EE" />,
      label: 'Editar',
      fn: edit,
    },
    {
      id: 3,
      icon: <MdDeleteForever size={16} color="#DE3B3B" />,
      label: 'Excluir',
      fn: remove,
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
      <ContextMenu menuActions={menuActions} contextId={1} />,
    ],
    [
      '#02',
      'Wolfgang Amadeus',
      'Gaspar Antunes',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={0} />,
      <ContextMenu menuActions={menuActions} contextId={2} />,
    ],
    [
      '#03',
      'Johann Sebastian Bach',
      'Dai Jiang',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={1} />,
      <ContextMenu menuActions={menuActions} contextId={3} />,
    ],
    [
      '#04',
      'Frédéric Chopin',
      'Tom Hanson',
      'Rio do Sul',
      'Santa Catarina',
      <StatusTag code={9} />,
      <ContextMenu menuActions={menuActions} contextId={4} />,
    ],
  ];

  return (
    <>
      <Container>
        {loading ? (
          <LoadingIndicator size={80} color="#ddd" />
        ) : (
          <>
            <h1>Gerenciando encomendas</h1>
            <div>
              <SearchInput placeholder="Buscar por encomendas" />
              <Button icon="MdAdd" text="Cadastrar" />
            </div>
            <DataTable header={tableHeader} dataArray={dataArray} />
            <PaginationBar info={paginationInfo} onPageChange={onPageChange} />
          </>
        )}
      </Container>
      {modalVisible && <Modal onClose={handleModalClose}>{modalContent}</Modal>}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';

import api from '~/services/api';

import { Container, ModalContent } from './styles';

import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import StatusTag from '~/components/StatusTag';
import ContextMenu from '~/components/ContextMenu';
import PaginationBar from '~/components/PaginationBar';
import LoadingIndicator from '~/components/LoadingIndicator';
import Modal from '~/components/Modal';
import Avatar from '~/components/Avatar';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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

  const query = useQuery();
  const history = useHistory();
  console.log(query.toString());
  console.log(query.set('limit', 20));
  console.log(query.toString());
  console.log(query.get('page'));
  console.log(query.get('limit'));
  console.log(query.get('q'));
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});

  // const [paginationInfo, setPaginationInfo] = useState({
  //   current: 1,
  //   size: 25,
  //   last: 927,
  // });
  function onPageChange(page) {
    console.log(`onPageChange() should be revised - ${page}`);

    // setPaginationInfo({ ...paginationInfo, current: page });
    setCurrentPage(page);
    // history.push({
    //   pathname:'/deliveries',

    // })
    // loadData();
  }
  function onPageSizeChange(size) {
    console.log(`onPageSizeChange() should be revised - ${size}`);

    // setPaginationInfo({ ...paginationInfo, size });
    setPageSize(size);
    setCurrentPage(1);
    // loadData();
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const response = await api.get('deliveries', {
        params: {
          page: currentPage,
          limit: pageSize,
          q: searchQuery,
        },
      });

      const data = response.data.rows.map(row => [
        row.id,
        row.recipient.name,
        <Avatar
          url={row.deliveryman.avatar && row.deliveryman.avatar.url}
          size={35}
          name={row.deliveryman.name}
        >
          {row.deliveryman.name}
        </Avatar>,
        row.recipient.city,
        row.recipient.state,
        <StatusTag code={row.status} />,
        <ContextMenu menuActions={menuActions} contextId={row.id} />,
      ]);

      setDeliveries(data);
      setPaginationInfo(response.data.pagination);

      console.log(`loadData() should be revised`);
      setLoading(false);
    }
    loadData();
  }, [currentPage, pageSize, searchQuery]);

  // const dataArray = [
  //   [
  //     '#01',
  //     'Ludwig van Beethoven',
  //     <AvatarPlaceholder size={35} name="John Doe">
  //       John Doe
  //     </AvatarPlaceholder>,
  //     'Rio do Sul',
  //     'Santa Catarina',
  //     <StatusTag code={2} />,
  //     <ContextMenu menuActions={menuActions} contextId={1} />,
  //   ],
  //   [
  //     '#02',
  //     'Wolfgang Amadeus',
  //     <AvatarPlaceholder size={35} name="Gaspar Antunes">
  //       Gaspar Antunes
  //     </AvatarPlaceholder>,
  //     'Rio do Sul',
  //     'Santa Catarina',
  //     <StatusTag code={0} />,
  //     <ContextMenu menuActions={menuActions} contextId={2} />,
  //   ],
  //   [
  //     '#03',
  //     'Johann Sebastian Bach',
  //     <AvatarPlaceholder size={35} name="Dai Jiang">
  //       Dai Jiang
  //     </AvatarPlaceholder>,
  //     'Rio do Sul',
  //     'Santa Catarina',
  //     <StatusTag code={1} />,
  //     <ContextMenu menuActions={menuActions} contextId={3} />,
  //   ],
  //   [
  //     '#04',
  //     'Frédéric Chopin',
  //     <AvatarPlaceholder size={35} name="Tom Hanson">
  //       Tom Hanson
  //     </AvatarPlaceholder>,
  //     'Rio do Sul',
  //     'Santa Catarina',
  //     <StatusTag code={9} />,
  //     <ContextMenu menuActions={menuActions} contextId={4} />,
  //   ],
  // ];

  return (
    <>
      <Container>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <h1>Gerenciando encomendas</h1>
            <div>
              <SearchInput placeholder="Buscar por encomendas" />
              <Button icon="MdAdd" text="Cadastrar" />
            </div>
            <DataTable header={tableHeader} dataArray={deliveries} />
            <PaginationBar
              info={paginationInfo}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </>
        )}
      </Container>
      {modalVisible && <Modal onClose={handleModalClose}>{modalContent}</Modal>}
    </>
  );
}

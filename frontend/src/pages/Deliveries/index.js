/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MdVisibility, MdCreate, MdDeleteForever } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseISO, format } from 'date-fns';

import api from '~/services/api';

import maskFormat from '~/util/maskFormat';

import {
  Container,
  SearchAndFilter,
  ModalContent,
  NoContentMessage,
} from './styles';

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
  const tableHeader = [
    'ID',
    'Destinatário',
    'Entregador',
    'Cidade',
    'Estado',
    'Status',
    'Ações',
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const query = useQuery();
  const queryString = query.toString();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({
    page: Number(query.get('page')) || 1,
    limit: Number(query.get('limit')) || 10,
    searchQuery: query.get('q') || '',
    filter: query.get('filter') || '',
  });
  let searchInputTimer = null;
  const searchInputRef = useRef(null);
  const [deliveries, setDeliveries] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});

  async function visualize(id) {
    console.log(`visualize() should be revised - ${id}`);

    try {
      const response = await api.get(`deliveries/${id}`);
      const {
        recipient,
        start_date: startDate,
        end_date: endDate,
        signature,
      } = response.data;

      setModalContent(
        <ModalContent onClick={e => e.stopPropagation()}>
          <div>
            <h4>Informações da encomenda</h4>
            <span>
              {`${recipient.street}, ${recipient.number}`}
              {recipient.complement && `, ${recipient.complement}`}
            </span>
            <br />
            <span>{`${recipient.city}, ${recipient.state}`}</span>
            <br />
            <span>{maskFormat(recipient.cep, 'XXXXX-XXX')}</span>
          </div>
          <hr />
          <div>
            <h4>Datas</h4>
            <span>
              <strong>Retirada:</strong>{' '}
              {startDate
                ? format(parseISO(startDate), 'dd/MM/yyyy')
                : '__/__/__'}
            </span>
            <br />
            <span>
              <strong>Entrega:</strong>{' '}
              {endDate ? format(parseISO(endDate), 'dd/MM/yyyy') : '__/__/__'}
            </span>
          </div>
          <hr />
          <div>
            <h4>Assinatura do destinatário</h4>
            <div>
              {signature && (
                <img src={signature.url} alt="Foto da assinatura" />
              )}
            </div>
          </div>
        </ModalContent>
      );
      setModalVisible(true);
    } catch (error) {
      toast.error('Erro ao consultar os dados encomenda, tente novamente.');
    }
  }

  function edit(id) {
    console.log(`edit() should be implemented - ${id}`);
  }

  async function remove(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Realmente deseja excluir a encomenda #${id}?`)) {
      try {
        await api.delete(`deliveries/${id}`);
        toast.success('Encomenda removida com sucesso!');
        // eslint-disable-next-line no-use-before-define
        loadData();

        // // or this (offline) fast refresh
        // setDeliveries(prevState => [
        //   ...prevState.filter(delivery => delivery[0] !== id),
        // ]);
      } catch (error) {
        toast.error('Erro ao remover a encomenda, tente novamente.');
      }
    }
  }

  const [menuActions] = useState([
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
  ]);

  function handleModalClose() {
    setModalVisible(false);
    setModalContent(null);
  }

  function handleSearchInputChange() {
    clearTimeout(searchInputTimer);
    searchInputTimer = setTimeout(() => {
      setLoading(true);
      const searchQuery = searchInputRef.current.value;
      setQueryParams({ ...queryParams, page: 1, searchQuery });
      query.set('page', 1);
      query.set('q', searchQuery);
      history.push({
        pathname: '/deliveries',
        search: `?${query.toString()}`,
      });
      setLoading(false);
    }, 700);
  }

  function handleFilterProblemsChange() {
    let { filter } = queryParams;

    if (filter === 'problems') {
      filter = '';
    } else {
      filter = 'problems';
    }
    setQueryParams({ ...queryParams, page: 1, filter });
    query.set('page', 1);
    query.set('filter', filter);
    history.push({
      pathname: '/deliveries',
      search: `?${query.toString()}`,
    });
  }

  function onPageChange(page) {
    setQueryParams({ ...queryParams, page });
    query.set('page', page);
    history.push({
      pathname: '/deliveries',
      search: `?${query.toString()}`,
    });
  }
  function onPageSizeChange(size) {
    setQueryParams({ ...queryParams, page: 1, limit: size });
    query.set('page', 1);
    query.set('limit', size);
    history.push({
      pathname: '/deliveries',
      search: `?${query.toString()}`,
    });
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('deliveries', {
        params: {
          page: queryParams.page,
          limit: queryParams.limit,
          q: queryParams.searchQuery,
          filter: queryParams.filter,
        },
      });

      const data = response.data.rows.map(row => [
        <span title={row.product}>{row.id}</span>,
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
      searchInputRef.current.defaultValue = queryParams.searchQuery;
    } catch (error) {
      toast.error(
        'Um erro ocorreu ao carregar os dados, tente novamente em breve.'
      );
    }

    setLoading(false);
  }, [queryParams, menuActions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setQueryParams({
      page: Number(query.get('page')) || 1,
      limit: Number(query.get('limit')) || 10,
      searchQuery: query.get('q') || '',
      filter: query.get('filter') || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <>
      <Container>
        <h1>Gerenciando encomendas</h1>
        <div>
          <SearchAndFilter>
            <SearchInput
              ref={searchInputRef}
              placeholder="Buscar por encomendas"
              onChange={handleSearchInputChange}
            />
            <input
              type="checkbox"
              id="problems"
              checked={queryParams.filter === 'problems'}
              onChange={handleFilterProblemsChange}
            />
            <label htmlFor="problems">Apenas com problemas</label>
          </SearchAndFilter>
          <Button icon="MdAdd" text="Cadastrar" />
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {deliveries.length === 0 ? (
              <NoContentMessage>
                <em>Não há encomendas para exibir.</em>
              </NoContentMessage>
            ) : (
              <>
                <DataTable header={tableHeader} dataArray={deliveries} />
                <PaginationBar
                  info={paginationInfo}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              </>
            )}
          </>
        )}
      </Container>
      {modalVisible && <Modal onClose={handleModalClose}>{modalContent}</Modal>}
    </>
  );
}

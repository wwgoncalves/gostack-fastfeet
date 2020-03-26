/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { MdCreate, MdDeleteForever } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, NoContentMessage } from './styles';

import SearchInput from '~/components/SearchInput';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import ContextMenu from '~/components/ContextMenu';
import PaginationBar from '~/components/PaginationBar';
import LoadingIndicator from '~/components/LoadingIndicator';
import Avatar from '~/components/Avatar';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Deliverymen() {
  const tableHeader = ['ID', 'Foto', 'Nome', 'E-mail', 'Ações'];

  const query = useQuery();
  const queryString = query.toString();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({
    page: Number(query.get('page')) || 1,
    limit: Number(query.get('limit')) || 10,
    searchQuery: query.get('q') || '',
  });
  let searchInputTimer = null;
  const searchInputRef = useRef(null);
  const [deliverymen, setDeliverymen] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});

  function edit(id) {
    history.push(`/deliverymen/${id}`);
  }

  async function remove(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Realmente deseja excluir o entregador #${id}?`)) {
      try {
        await api.delete(`deliverymen/${id}`);
        toast.success('Entregador removido com sucesso!');
        // eslint-disable-next-line no-use-before-define
        loadData();
      } catch (error) {
        toast.error(
          'Erro ao remover o entregador. Se não há encomenda ainda associada a ele, tente novamente em breve.'
        );
      }
    }
  }

  const [menuActions] = useState([
    {
      id: 1,
      icon: <MdCreate size={16} color="#4D85EE" />,
      label: 'Editar',
      fn: edit,
    },
    {
      id: 2,
      icon: <MdDeleteForever size={16} color="#DE3B3B" />,
      label: 'Excluir',
      fn: remove,
    },
  ]);

  function handleSearchInputChange() {
    clearTimeout(searchInputTimer);
    searchInputTimer = setTimeout(() => {
      setLoading(true);
      const searchQuery = searchInputRef.current.value;
      setQueryParams({ ...queryParams, page: 1, searchQuery });
      query.set('page', 1);
      query.set('q', searchQuery);
      history.push({
        pathname: '/deliverymen',
        search: `?${query.toString()}`,
      });
      setLoading(false);
    }, 800);
  }

  function onPageChange(page) {
    setQueryParams({ ...queryParams, page });
    query.set('page', page);
    history.push({
      pathname: '/deliverymen',
      search: `?${query.toString()}`,
    });
  }
  function onPageSizeChange(size) {
    setQueryParams({ ...queryParams, page: 1, limit: size });
    query.set('page', 1);
    query.set('limit', size);
    history.push({
      pathname: '/deliverymen',
      search: `?${query.toString()}`,
    });
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('deliverymen', {
        params: {
          page: queryParams.page,
          limit: queryParams.limit,
          q: queryParams.searchQuery,
        },
      });

      const data = response.data.rows.map(deliveryman => [
        deliveryman.id,
        <Avatar
          url={deliveryman.avatar && deliveryman.avatar.url}
          size={35}
          name={deliveryman.name}
        />,
        deliveryman.name,
        deliveryman.email,
        <ContextMenu menuActions={menuActions} contextId={deliveryman.id} />,
      ]);

      setDeliverymen(data);
      setPaginationInfo(response.data.pagination);
      searchInputRef.current.value = queryParams.searchQuery;
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <>
      <Container>
        <h1>Gerenciando entregadores</h1>
        <div>
          <SearchInput
            ref={searchInputRef}
            placeholder="Buscar por entregadores"
            onChange={handleSearchInputChange}
          />
          <Button
            icon="MdAdd"
            text="Cadastrar"
            onClick={() => history.push('/deliverymen/new')}
          />
        </div>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {deliverymen.length === 0 ? (
              <NoContentMessage>
                <em>
                  Não há entregadores para exibir, verifique os filtros
                  aplicados.
                </em>
              </NoContentMessage>
            ) : (
              <>
                <DataTable header={tableHeader} dataArray={deliverymen} />
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
    </>
  );
}

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import { MdVisibility, MdDeleteForever } from 'react-icons/md';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, NoContentMessage, ModalContent } from './styles';

import DataTable from '~/components/DataTable';
import ContextMenu from '~/components/ContextMenu';
import PaginationBar from '~/components/PaginationBar';
import LoadingIndicator from '~/components/LoadingIndicator';
import Modal from '~/components/Modal';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Problems() {
  const tableHeader = ['Encomenda', 'Problema', 'Ações'];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const query = useQuery();
  const queryString = query.toString();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({
    page: Number(query.get('page')) || 1,
    limit: Number(query.get('limit')) || 10,
  });
  const [problems, setProblems] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});

  async function visualize(id) {
    try {
      const response = await api.get(`problems/${id}`);
      const { description } = response.data;

      setModalContent(
        <ModalContent onClick={e => e.stopPropagation()}>
          <div>
            <h4>Descrição do problema</h4>
            <span>{description}</span>
          </div>
        </ModalContent>
      );
      setModalVisible(true);
    } catch (error) {
      toast.error(
        'Erro ao consultar a descrição do problema, tente novamente.'
      );
    }
  }

  async function cancelDelivery(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Realmente deseja cancelar a encomenda com problema?`)) {
      try {
        const response = await api.delete(`problems/${id}/delivery`);
        toast.success(`Encomenda #${response.data.id} cancelada com sucesso!`);
        // eslint-disable-next-line no-use-before-define
        loadData();
      } catch (error) {
        toast.error('Erro ao cancelar a encomenda. Tente novamente em breve.');
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
      icon: <MdDeleteForever size={16} color="#DE3B3B" />,
      label: 'Cancelar encomenda',
      fn: cancelDelivery,
    },
  ]);

  function handleModalClose() {
    setModalVisible(false);
    setModalContent(null);
  }

  function onPageChange(page) {
    setQueryParams({ ...queryParams, page });
    query.set('page', page);
    history.push({
      pathname: '/problems',
      search: `?${query.toString()}`,
    });
  }
  function onPageSizeChange(size) {
    setQueryParams({ ...queryParams, page: 1, limit: size });
    query.set('page', 1);
    query.set('limit', size);
    history.push({
      pathname: '/problems',
      search: `?${query.toString()}`,
    });
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('problems', {
        params: {
          page: queryParams.page,
          limit: queryParams.limit,
        },
      });

      const data = response.data.rows.map(problem => [
        problem.delivery_id,
        problem.description.length > 110
          ? `${problem.description.substring(0, 109)}...`
          : problem.description,
        <ContextMenu menuActions={menuActions} contextId={problem.id} />,
      ]);

      setProblems(data);
      setPaginationInfo(response.data.pagination);
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
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <>
      <Container>
        <h1>Problemas na entrega</h1>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {problems.length === 0 ? (
              <NoContentMessage>
                <em>
                  Não há problemas para exibir, verifique a paginação aplicada.
                </em>
              </NoContentMessage>
            ) : (
              <>
                <DataTable header={tableHeader} dataArray={problems} />
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

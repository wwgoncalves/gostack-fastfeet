import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';

import {
  Container,
  Title,
  ProblemsList,
  Problem,
  ProblemDescription,
  ProblemDate,
  NoContentMessage,
} from './styles';

import api from '~/services/api';

import LoadingIndicator from '~/components/LoadingIndicator';
import CustomRefreshControl from '~/components/CustomRefreshControl';

export default function Problems({ route }) {
  const { deliveryId } = route.params;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [problems, setProblems] = useState([]);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
  });
  const [paginationInfo, setPaginationInfo] = useState({});

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  function handleListEndReached() {
    if (paginationInfo.last > queryParams.page) {
      setLoadingMore(true);
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  }

  function refreshList() {
    setLoading(true);
    setRefreshing(true);
    setProblems([]);
    setQueryParams({
      ...queryParams,
      page: 1,
    });
  }

  useEffect(() => {
    async function loadData() {
      if (!deliveryId) return;

      setLoading(true);
      try {
        const response = await api.get(`deliveries/${deliveryId}/problems`, {
          params: {
            page: queryParams.page,
            limit: queryParams.limit,
          },
        });

        setProblems((prevProblems) =>
          prevProblems.length > 0
            ? [...prevProblems, ...response.data.rows]
            : response.data.rows
        );
        setPaginationInfo(response.data.pagination);
      } catch (error) {
        Alert.alert('Erro ao buscar problemas', 'Tente novamente em breve.');
      }
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }

    loadData();
  }, [deliveryId, queryParams]);

  return (
    <Container>
      <Title>{`Encomenda ${deliveryId}`}</Title>
      {loading && !loadingMore && <LoadingIndicator absolutePositioning />}
      {problems.length > 0 ? (
        <ProblemsList
          data={problems}
          renderItem={({ item }) => (
            <Problem>
              <ProblemDescription>{item.description}</ProblemDescription>
              <ProblemDate>
                {format(parseISO(item.created_at), 'dd/MM/yyyy')}
              </ProblemDate>
            </Problem>
          )}
          keyExtractor={(item) => String(item.id)}
          onEndReachedThreshold={0.5}
          onEndReached={handleListEndReached}
          refreshControl={
            <CustomRefreshControl
              onRefresh={refreshList}
              refreshing={refreshing}
            />
          }
          ListFooterComponent={loadingMore && <LoadingIndicator />}
        />
      ) : (
        !loading &&
        !refreshing && (
          <NoContentMessage>
            Não há problema cadastrado para essa encomenda.
          </NoContentMessage>
        )
      )}
    </Container>
  );
}

Problems.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

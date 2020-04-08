import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Alert } from 'react-native';

import api from '~/services/api';

import { signOut } from '~/store/modules/user/actions';

import {
  Container,
  Header,
  Top,
  LeftTop,
  MiddleTop,
  WelcomeBack,
  Username,
  LogoutButton,
  LogoutIcon,
  Bottom,
  RightBottom,
  Title,
  FilterButton,
  FilterText,
  DeliveriesList,
  NoContentMessage,
} from './styles';

import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import Delivery from '~/components/Delivery';
import LoadingIndicator from '~/components/LoadingIndicator';
import CustomRefreshControl from '~/components/CustomRefreshControl';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 5,
    status: 'pending',
  });
  const [deliveries, setDeliveries] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
      }
    }, [])
  );

  function confirmLogout() {
    Alert.alert('Logout do app', 'Deseja realmente se deslogar?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => dispatch(signOut()) },
    ]);
  }

  function filterByStatus(status) {
    setLoading(true);

    setDeliveries([]);
    setQueryParams({
      ...queryParams,
      page: 1,
      status,
    });
  }

  function handleListEndReached() {
    if (paginationInfo.last > queryParams.page) {
      setLoadingMore(true);
      setQueryParams({ ...queryParams, page: queryParams.page + 1 });
    }
  }

  function refreshList() {
    setLoading(true);
    setRefreshing(true);
    setDeliveries([]);
    setQueryParams({
      ...queryParams,
      page: 1,
    });
  }

  useEffect(() => {
    async function loadData() {
      if (!profile) return;

      setLoading(true);
      try {
        const response = await api.get(`deliverymen/${profile.id}/deliveries`, {
          params: {
            page: queryParams.page,
            limit: queryParams.limit,
            status: queryParams.status,
          },
        });

        setDeliveries((prevDeliveries) =>
          prevDeliveries.length > 0
            ? [...prevDeliveries, ...response.data.rows]
            : response.data.rows
        );
        setPaginationInfo(response.data.pagination);
      } catch (error) {
        Alert.alert('Erro ao carregar dados', 'Tente novamente em breve.');
      }
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }

    loadData();
  }, [profile, queryParams]);

  return (
    <Container>
      {profile && (
        <>
          <Header>
            <Top>
              <LeftTop>
                {profile.avatar ? (
                  <Avatar size={64} source={{ uri: profile.avatar.url }} />
                ) : (
                  <AvatarPlaceholder size={64} name={profile.name} />
                )}
                <MiddleTop>
                  <WelcomeBack>Bem vindo de volta,</WelcomeBack>
                  <Username>{profile.name}</Username>
                </MiddleTop>
              </LeftTop>
              <LogoutButton onPress={confirmLogout}>
                <LogoutIcon />
              </LogoutButton>
            </Top>
            <Bottom>
              <Title>Entregas</Title>
              <RightBottom>
                <FilterButton onPress={() => filterByStatus('pending')}>
                  <FilterText active={queryParams.status === 'pending'}>
                    Pendentes
                  </FilterText>
                </FilterButton>

                <FilterButton onPress={() => filterByStatus('finished')}>
                  <FilterText active={queryParams.status === 'finished'}>
                    Entregues
                  </FilterText>
                </FilterButton>
              </RightBottom>
            </Bottom>
          </Header>

          {loading && !loadingMore && <LoadingIndicator absolutePositioning />}
          {deliveries.length > 0 ? (
            <DeliveriesList
              data={deliveries}
              renderItem={({ item }) => (
                <Delivery delivery={item} navigation={navigation} />
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
                Não há entregas para exibir nessa situação.
              </NoContentMessage>
            )
          )}
        </>
      )}
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';

import {
  Container,
  ContentAndActions,
  Header,
  HeadingText,
  Label,
  Value,
  NoValue,
  InformationContainer,
  InformationHeaderIcon,
  StatusContainer,
  StatusHeaderIcon,
  DatesContainer,
  DateContainer,
  ActionsContainer,
  Separator,
  ActionButton,
  PickupIcon,
  PickingUpIndicator,
  ReportIcon,
  ProblemsIcon,
  FinishIcon,
  ActionButtonLabel,
} from './styles';

import api from '~/services/api';
import maskFormat from '~/util/maskFormat';

import LoadingIndicator from '~/components/LoadingIndicator';
import CustomRefreshControl from '~/components/CustomRefreshControl';

export default function Details({ route, navigation }) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  const profile = useSelector((state) => state.user.profile);

  const [deliveryId] = useState(route.params.deliveryId);
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pickingUp, setPickingUp] = useState(false);

  const pickupPending = useMemo(() => delivery && delivery.status === 0, [
    delivery,
  ]);
  const isDelivered = useMemo(() => delivery && delivery.status === 2, [
    delivery,
  ]);
  const statusText = useMemo(
    () => (delivery && delivery.status === 2 ? 'Entregue' : 'Pendente'),
    [delivery]
  );

  const recipientAddress = useMemo(() => {
    if (delivery) {
      const { recipient } = delivery;
      const { street, number, complement, city, state, cep } = recipient;
      return [
        street,
        `${number}${complement ? `, ${complement}` : ''}`,
        `${city} - ${state}`,
        maskFormat(cep, 'XXXXX-XXX'),
      ].join(', ');
    }
    return '';
  }, [delivery]);

  function navigateTo(screenName) {
    navigation.navigate(screenName);
  }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `deliverymen/${profile.id}/deliveries/${deliveryId}`
      );

      setDelivery(response.data);
    } catch (error) {
      Alert.alert('Erro ao carregar dados', 'Tente novamente em breve.');
    }
    setLoading(false);
  }, [profile, deliveryId]);

  async function refreshData() {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handlePickup() {
    setPickingUp(true);
    try {
      await api.put(`deliverymen/${profile.id}/deliveries/${deliveryId}`, {
        start_date: new Date(),
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Erro ao registrar retirada', error.response.data.error);
      } else {
        Alert.alert('Erro ao registrar retirada', 'Tente novamente em breve.');
      }
    }
    refreshData();
    setPickingUp(false);
  }

  function confirmPickup() {
    Alert.alert(
      'Retirada da encomenda',
      'Confirma a retirada para entrega da encomenda?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => handlePickup() },
      ]
    );
  }

  return (
    <Container>
      {(loading || refreshing) && <LoadingIndicator absolutePositioning />}
      <ContentAndActions
        refreshControl={
          <CustomRefreshControl
            onRefresh={refreshData}
            refreshing={refreshing}
          />
        }
      >
        {/* <Text>Details of the delivery</Text> */}
        {delivery && (
          <>
            <InformationContainer>
              <Header>
                <InformationHeaderIcon />
                <HeadingText>Informações da entrega</HeadingText>
              </Header>
              <Label>Destinatário</Label>
              <Value>{delivery.recipient.name}</Value>
              <Label>Endereço de entrega</Label>
              <Value>{recipientAddress}</Value>
              <Label>Produto</Label>
              <Value>{delivery.product}</Value>
            </InformationContainer>

            <StatusContainer>
              <Header>
                <StatusHeaderIcon />
                <HeadingText>Situação da entrega</HeadingText>
              </Header>
              <Label>Status</Label>
              <Value>{statusText}</Value>
              <DatesContainer>
                <DateContainer>
                  <Label>Data de retirada</Label>
                  {delivery.start_date ? (
                    <Value>
                      {format(parseISO(delivery.start_date), 'dd/MM/yyyy')}
                    </Value>
                  ) : (
                    <NoValue>Retirada pendente</NoValue>
                  )}
                </DateContainer>
                <DateContainer>
                  <Label>Data de entrega</Label>
                  {delivery.end_date ? (
                    <Value>
                      {format(parseISO(delivery.end_date), 'dd/MM/yyyy')}
                    </Value>
                  ) : (
                    <NoValue>Entrega pendente</NoValue>
                  )}
                </DateContainer>
              </DatesContainer>
            </StatusContainer>

            <ActionsContainer>
              {pickupPending ? (
                <ActionButton onPress={confirmPickup}>
                  {!pickingUp ? <PickupIcon /> : <PickingUpIndicator />}
                  <ActionButtonLabel>Retirar Encomenda</ActionButtonLabel>
                </ActionButton>
              ) : (
                <>
                  <ActionButton
                    disabled={isDelivered}
                    onPress={() => !isDelivered && navigateTo('Report')}
                  >
                    <ReportIcon />
                    <ActionButtonLabel>Informar Problema</ActionButtonLabel>
                  </ActionButton>
                  <Separator />

                  <ActionButton onPress={() => navigateTo('Problems')}>
                    <ProblemsIcon />
                    <ActionButtonLabel>Visualizar Problemas</ActionButtonLabel>
                  </ActionButton>

                  <Separator />
                  <ActionButton
                    disabled={isDelivered}
                    onPress={() => !isDelivered && navigateTo('Finish')}
                  >
                    <FinishIcon />
                    <ActionButtonLabel>Confirmar Entrega</ActionButtonLabel>
                  </ActionButton>
                </>
              )}
            </ActionsContainer>
          </>
        )}
      </ContentAndActions>
    </Container>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      deliveryId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

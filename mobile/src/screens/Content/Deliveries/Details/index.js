import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, StatusBar, Platform } from 'react-native';
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
  ReportIcon,
  ProblemsIcon,
  FinishIcon,
  ActionButtonLabel,
} from './styles';

import maskFormat from '~/util/maskFormat';

export default function Details({ route, navigation }) {
  const { delivery } = route.params;
  const { recipient } = delivery;

  recipient.address = `${recipient.street}, ${recipient.number}${
    recipient.complement ? `, ${recipient.complement}` : ''
  }, ${recipient.city} - ${recipient.state}, ${maskFormat(
    recipient.cep,
    'XXXXX-XXX'
  )}`;
  const status = delivery.status === 2 ? 'Entregue' : 'Pendente';
  const delivered = delivery.status === 2;

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  function navigateTo(screenName) {
    if (!screenName) return;

    navigation.navigate(screenName);
  }

  return (
    <Container>
      <ContentAndActions>
        {/* <Text>Details of the delivery</Text> */}
        <InformationContainer>
          <Header>
            <InformationHeaderIcon />
            <HeadingText>Informações da entrega</HeadingText>
          </Header>
          <Label>Destinatário</Label>
          <Value>{delivery.recipient.name}</Value>
          <Label>Endereço de entrega</Label>
          <Value>{recipient.address}</Value>
          <Label>Produto</Label>
          <Value>{delivery.product}</Value>
        </InformationContainer>

        <StatusContainer>
          <Header>
            <StatusHeaderIcon />
            <HeadingText>Situação da entrega</HeadingText>
          </Header>
          <Label>Status</Label>
          <Value>{status}</Value>
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
          <ActionButton
            disabled={delivered}
            onPress={() => navigateTo(!delivered ? 'Report' : '')}
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
            disabled={delivered}
            onPress={() => navigateTo(!delivered ? 'Finish' : '')}
          >
            <FinishIcon />
            <ActionButtonLabel>Confirmar Entrega</ActionButtonLabel>
          </ActionButton>
        </ActionsContainer>
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
      delivery: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

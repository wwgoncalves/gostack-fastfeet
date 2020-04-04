import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import {
  DeliveryContainer,
  DeliveryHeader,
  HeadingIcon,
  HeadingText,
  StatusContainer,
  DeliveryFooter,
  RegistrationDate,
  Label,
  Value,
  RecipientCity,
  GoToDetailsButton,
  GoToDetailsText,
} from './styles';

import StatusLine from '~/components/StatusLine';

export default function Delivery({ delivery, navigation }) {
  return (
    <DeliveryContainer>
      <DeliveryHeader>
        <HeadingIcon />
        <HeadingText>{`Encomenda ${delivery.id}`}</HeadingText>
      </DeliveryHeader>
      <StatusContainer>
        <StatusLine statusCode={delivery.status} />
      </StatusContainer>
      <DeliveryFooter>
        <RegistrationDate>
          <Label>Data</Label>
          <Value>{format(parseISO(delivery.created_at), 'dd/MM/yyyy')}</Value>
        </RegistrationDate>
        <RecipientCity>
          <Label>Cidade</Label>
          <Value>{delivery.recipient.city}</Value>
        </RecipientCity>
        <GoToDetailsButton
          onPress={() => navigation.navigate('Details', { delivery })}
        >
          <GoToDetailsText>Ver detalhes</GoToDetailsText>
        </GoToDetailsButton>
      </DeliveryFooter>
    </DeliveryContainer>
  );
}

Delivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  delivery: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

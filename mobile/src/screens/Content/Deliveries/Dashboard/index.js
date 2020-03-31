import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from 'react-native';

import {
  Container,
  DeliveryContainer,
  DeliveryHeader,
  HeadingIcon,
  HeadingText,
  StatusContainer,
} from './styles';

import StatusLine from '~/components/StatusLine';

export default function Dashboard({ navigation }) {
  return (
    <Container>
      <Text>App dashboard listing pending or finished deliveries</Text>
      <Button
        title="Ver detalhes"
        onPress={() => navigation.navigate('Details')}
      />
      <DeliveryContainer>
        <DeliveryHeader>
          <HeadingIcon />
          <HeadingText>Encomenda 01</HeadingText>
        </DeliveryHeader>

        <StatusContainer>
          <StatusLine statusCode={0} />
        </StatusContainer>
      </DeliveryContainer>
      <DeliveryContainer>
        <DeliveryHeader>
          <HeadingIcon />
          <HeadingText>Encomenda 02</HeadingText>
        </DeliveryHeader>

        <StatusContainer>
          <StatusLine statusCode={1} />
        </StatusContainer>
      </DeliveryContainer>
      <DeliveryContainer>
        <DeliveryHeader>
          <HeadingIcon />
          <HeadingText>Encomenda 03</HeadingText>
        </DeliveryHeader>

        <StatusContainer>
          <StatusLine statusCode={2} />
        </StatusContainer>
      </DeliveryContainer>
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

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
  DeliveryFooter,
  RegistrationDate,
  Label,
  Value,
  RecipientCity,
  GoToDetailsButton,
  GoToDetailsText,
  DistanceToBottomTab,
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
        <DeliveryFooter>
          <RegistrationDate>
            <Label>Data</Label>
            <Value>14/01/2020</Value>
          </RegistrationDate>
          <RecipientCity>
            <Label>Cidade</Label>
            <Value>Diadema</Value>
          </RecipientCity>
          <GoToDetailsButton onPress={() => {}}>
            <GoToDetailsText>Ver detalhes</GoToDetailsText>
          </GoToDetailsButton>
        </DeliveryFooter>
      </DeliveryContainer>

      <DeliveryContainer>
        <DeliveryHeader>
          <HeadingIcon />
          <HeadingText>Encomenda 02</HeadingText>
        </DeliveryHeader>
        <StatusContainer>
          <StatusLine statusCode={1} />
        </StatusContainer>
        <DeliveryFooter>
          <RegistrationDate>
            <Label>Data</Label>
            <Value>15/01/2020</Value>
          </RegistrationDate>
          <RecipientCity>
            <Label>Cidade</Label>
            <Value>Rio do Sul</Value>
          </RecipientCity>
          <GoToDetailsButton onPress={() => {}}>
            <GoToDetailsText>Ver detalhes</GoToDetailsText>
          </GoToDetailsButton>
        </DeliveryFooter>
      </DeliveryContainer>

      <DeliveryContainer>
        <DeliveryHeader>
          <HeadingIcon />
          <HeadingText>Encomenda 03</HeadingText>
        </DeliveryHeader>
        <StatusContainer>
          <StatusLine statusCode={2} />
        </StatusContainer>
        <DeliveryFooter>
          <RegistrationDate>
            <Label>Data</Label>
            <Value>30/01/2020</Value>
          </RegistrationDate>
          <RecipientCity>
            <Label>Cidade</Label>
            <Value>Porto Alegre</Value>
          </RecipientCity>
          <GoToDetailsButton onPress={() => {}}>
            <GoToDetailsText>Ver detalhes</GoToDetailsText>
          </GoToDetailsButton>
        </DeliveryFooter>
      </DeliveryContainer>

      <DistanceToBottomTab />
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

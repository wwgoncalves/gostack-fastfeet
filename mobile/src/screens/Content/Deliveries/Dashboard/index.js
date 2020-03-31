import React from 'react';
import PropTypes from 'prop-types';
import { Text, Alert } from 'react-native';

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
  ListContainer,
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
  DistanceToScrollEnd,
} from './styles';

import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import StatusLine from '~/components/StatusLine';

export default function Dashboard({ navigation }) {
  function logoutConfirmation() {
    Alert.alert('Logout do app', 'Deseja realmente se deslogar?', [
      {
        text: 'Não',
        onPress: () => console.tron.log('Não!!'),
        style: 'cancel',
      },
      { text: 'Sim', onPress: () => console.tron.log('Sim!!') },
    ]);
  }

  return (
    <Container>
      {/* <Text>App dashboard listing pending or finished deliveries</Text> */}
      <Header>
        <Top>
          <LeftTop>
            <AvatarPlaceholder size={64} name="Gaspar Antunes" />
            <MiddleTop>
              <WelcomeBack>Bem vindo de volta,</WelcomeBack>
              <Username>Gaspar Antunes</Username>
            </MiddleTop>
          </LeftTop>
          <LogoutButton onPress={logoutConfirmation}>
            <LogoutIcon />
          </LogoutButton>
        </Top>
        <Bottom>
          <Title>Entregas</Title>
          <RightBottom>
            <FilterButton onPress={() => {}}>
              <FilterText active>Pendentes</FilterText>
            </FilterButton>
            <FilterButton onPress={() => {}}>
              <FilterText>Entregues</FilterText>
            </FilterButton>
          </RightBottom>
        </Bottom>
      </Header>

      <ListContainer>
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
            <GoToDetailsButton onPress={() => navigation.navigate('Details')}>
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
              <Value>São Sebastião do Caí</Value>
            </RecipientCity>
            <GoToDetailsButton onPress={() => {}}>
              <GoToDetailsText>Ver detalhes</GoToDetailsText>
            </GoToDetailsButton>
          </DeliveryFooter>
        </DeliveryContainer>

        <DistanceToScrollEnd />
      </ListContainer>
    </Container>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

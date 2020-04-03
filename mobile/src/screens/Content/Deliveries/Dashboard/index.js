import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Platform, Alert } from 'react-native';

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
} from './styles';

import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import StatusLine from '~/components/StatusLine';

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function logoutConfirmation() {
    Alert.alert('Logout do app', 'Deseja realmente se deslogar?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => dispatch(signOut()) },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
      }
    }, [])
  );

  return (
    <Container>
      {/* <Text>App dashboard listing pending or finished deliveries</Text> */}
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
                <GoToDetailsButton
                  onPress={() => navigation.navigate('Details')}
                >
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
          </ListContainer>
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

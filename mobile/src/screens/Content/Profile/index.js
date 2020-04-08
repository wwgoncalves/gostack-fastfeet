import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import { parseISO, format } from 'date-fns';

import { Container, AvatarContainer, Content, Label, Value } from './styles';

import { signOut } from '~/store/modules/user/actions';

import Avatar from '~/components/Avatar';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import Button from '~/components/Button';
import StatusBar from '~/components/StatusBar';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function confirmLogout() {
    Alert.alert('Logout do app', 'Deseja realmente se deslogar?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => dispatch(signOut()) },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar('white');
    }, [])
  );

  return (
    <Container>
      {profile && (
        <>
          <AvatarContainer>
            {profile.avatar ? (
              <Avatar size={136} source={{ uri: profile.avatar.url }} />
            ) : (
              <AvatarPlaceholder size={136} name={profile.name} />
            )}
          </AvatarContainer>
          <Content>
            <Label>Nome completo</Label>
            <Value>{profile.name}</Value>
            <Label>E-mail</Label>
            <Value>{profile.email}</Value>
            <Label>Data de cadastro</Label>
            <Value>{format(parseISO(profile.created_at), 'dd/MM/yyyy')}</Value>
          </Content>
          <Button backgroundColor="#e74040" onPress={confirmLogout}>
            Logout
          </Button>
        </>
      )}
    </Container>
  );
}

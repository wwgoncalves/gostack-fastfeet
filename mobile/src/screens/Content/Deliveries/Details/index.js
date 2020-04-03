import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, StatusBar, Platform } from 'react-native';

// import { Container } from './styles';

export default function Details({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#7d40e7');
      }
    }, [])
  );

  return (
    <View>
      <Text>Details of the delivery</Text>
      <Button
        title="Informar problema"
        onPress={() => navigation.navigate('Report')}
      />
      <Button
        title="Visualizar problemas"
        onPress={() => navigation.navigate('Problems')}
      />
      <Button
        title="Confirmar entrega"
        onPress={() => navigation.navigate('Finish')}
      />
    </View>
  );
}

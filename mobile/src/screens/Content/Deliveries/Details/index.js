import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function Details({ navigation }) {
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

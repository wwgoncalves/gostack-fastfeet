import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function Dashboard({ navigation }) {
  return (
    <View>
      <Text>App dashboard listing pending or finished deliveries</Text>
      <Button
        title="Ver detalhes"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

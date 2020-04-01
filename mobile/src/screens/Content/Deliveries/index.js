import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from './Dashboard';
import Details from './Details';
import Report from './Report';
import Problems from './Problems';
import Finish from './Finish';

const Stack = createStackNavigator();

export default function DeliveriesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard" // <<<<<<<<<<<<<<<<<<============================ for testing !!!!!!
      headerMode="float"
      screenOptions={{
        headerStyle: {
          height: 40,
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: '#7d40e7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerTitleAlign: 'center',
        // eslint-disable-next-line react/prop-types
        headerBackImage: ({ tintColor }) => (
          <Icon name="chevron-left" size={24} color={tintColor} />
        ),
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{ title: 'Informar problema' }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{ title: 'Visualizar problemas' }}
      />
      <Stack.Screen
        name="Finish"
        component={Finish}
        options={{ title: 'Confirmar entrega' }}
      />
    </Stack.Navigator>
  );
}

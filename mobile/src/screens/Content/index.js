import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DeliveriesStackNavigator from './Deliveries';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function ContentTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#999',
        tabStyle: { paddingVertical: 5 },
      }}
    >
      <Tab.Screen
        name="Entregas"
        component={DeliveriesStackNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, size }) => (
            <Icon name="reorder" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meu Perfil"
        component={Profile}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

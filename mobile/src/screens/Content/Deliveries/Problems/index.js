import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StatusBar, Platform } from 'react-native';

// import { Container } from './styles';

export default function Problems() {
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
      <Text>Problems of the delivery</Text>
    </View>
  );
}

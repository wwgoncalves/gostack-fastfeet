import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StatusBar, Platform } from 'react-native';

// import { Container } from './styles';

export default function Profile() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#fff');
      }
    }, [])
  );

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

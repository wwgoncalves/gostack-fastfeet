import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/screens/SignIn';
import ContentTabNavigator from '~/screens/Content';

const RootStack = createStackNavigator();

export default function Routes() {
  const isSigned = true; // <<<<<<<<<<<<<<<<<<============================ for testing !!!!!!

  return (
    <RootStack.Navigator headerMode="none">
      {isSigned ? (
        <RootStack.Screen name="Content" component={ContentTabNavigator} />
      ) : (
        <RootStack.Screen name="SignIn" component={SignIn} />
      )}
    </RootStack.Navigator>
  );
}

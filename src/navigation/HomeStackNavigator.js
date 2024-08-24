import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/Home';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
         
      />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;

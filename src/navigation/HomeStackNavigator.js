import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/Home';
import PrivacyPolicy from '../screens/Home/Privacy-Policy';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
         
      />
      <Stack.Screen 
        name="Privacy" 
        component={PrivacyPolicy} 
         
      />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;

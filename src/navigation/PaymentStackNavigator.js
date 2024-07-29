import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from '../screens/Payment/Payment';
import SelectPaymentScreen from '../screens/Payment/SelectPayment';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyPayment" 
        component={PaymentScreen} 
         
      />
      <Stack.Screen 
        name="SelectPayment" 
        component={SelectPaymentScreen} 
         
      />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;

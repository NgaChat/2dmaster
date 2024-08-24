import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GiftScreen from '../screens/Gift/Gift';
import GiftView from '../screens/Gift/GiftView'
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const PaymentStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyGift"
        component={GiftScreen}

      />
      <Stack.Screen
        name="GiftView"
        component={GiftView}

      />
    </Stack.Navigator>



  );
};

export default PaymentStackNavigator;

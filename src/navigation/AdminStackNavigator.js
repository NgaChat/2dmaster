import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminScreen from '../screens/Admin/Admin';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const AdminStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyAdmin" 
        component={AdminScreen} 
         
      />
    </Stack.Navigator>
  );
};

export default AdminStackNavigator;

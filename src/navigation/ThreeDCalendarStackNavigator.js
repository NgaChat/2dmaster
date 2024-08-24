import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ThreeDCalendar from '../screens/3DCalendar/3DCalendar';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const ThreeDCalendarStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ThreeD" 
        component={ThreeDCalendar} 
         
      />
    </Stack.Navigator>
  );
};

export default ThreeDCalendarStackNavigator;

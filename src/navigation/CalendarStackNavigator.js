import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../screens/Calendar/Calendar';
import Icon from '../components/Icon';

const Stack = createStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MyCalendar" 
        component={CalendarScreen} 
         
      />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;

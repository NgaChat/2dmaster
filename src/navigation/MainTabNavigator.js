import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Dashboard';
import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import PaymentStackNavigator from './PaymentStackNavigator';
import Icon from '../components/Icon';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const getTab = (r) => {
    const rr = getFocusedRouteNameFromRoute(r)
    if (rr == 'SelectPayment') return 'none'
    return 'flex';
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#f25824",
        tabBarInactiveTintColor: "white",
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: '#4CAF50',
          display: getTab(route)
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'android' : 'android';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'android' : 'android';
          } else if (route.name === 'Payment') {
            iconName = focused ? 'payment' : 'payments';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} type="MaterialIcons" />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} />
      <Tab.Screen name="Payment" options={{ headerShown: false }} component={PaymentStackNavigator} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

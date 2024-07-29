
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import DashboardScreen from '../screens/Dashboard'
import Icon from '@components/Icon';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import PaymentScreen from '../screens/Payment/Payment';
import SelectPaymentScreen from '../screens/Payment/SelectPayment';
import LoginScreen from '../screens/Login';
import ProfileScreen from '../screens/Profile'


import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../services/ThemeContext';

const AuthStack = createStackNavigator();
const MainStack = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStackScreen() {
  const { theme, toggleTheme } = useTheme();
  return (
    <AuthStack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#4CAF50', // Set the header background color
        },
        headerTintColor: '#fff', // Set the header text and icon color
        headerTitleAlign: 'center',
        headerRight: () => (
          <ThemeToggleSwitch />
        ),

      })}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function PaymentStack(){
  return(
    <Stack.Navigator 
   
    >
      <Stack.Screen name = "MyPayment" component={PaymentScreen} options={{headerShown:false}} />
      <Stack.Screen name = "SelectPayment" component={SelectPaymentScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#f25824",
        tabBarInactiveTintColor: "white",
        headerStyle: {
          backgroundColor: '#4CAF50', // Set the header background color
        },
        headerTintColor: '#fff', // Set the header text and icon color
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: '#4CAF50', // Set the background color of the tab bar
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'android' : 'android';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'person' : 'person-outline';
          }else if (route.name === 'Payment') {
            iconName = focused ? 'payment' : 'payments';
          }else if (route.name === 'Profile') {
            iconName = focused ? 'payment' : 'payments';
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} type="MaterialIcons" />;
        },
      })}

    >
      <MainStack.Screen name="Dashboard" component={DashboardScreen} />
      <MainStack.Screen name="Payment" component={PaymentStack} />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  )
}

// const ThemeToggleSwitch = ({ toggleTheme }) => {
//   const { theme } = useTheme();

//   return (
//     <View style={styles.themeToggleContainer}>
//       <Text style={{ color: theme.text }}>Dark Mode</Text>
//       <Switch
//         value={theme === 'dark'}
//         onValueChange={toggleTheme}
//         thumbColor={theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}
//         trackColor={{ false: '#CCCCCC', true: '#888888' }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   themeToggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
// });

export default function Navigator({ isAuthenticated }) {
  return !isAuthenticated ? <MainStackScreen /> : <AuthStackScreen />;
}

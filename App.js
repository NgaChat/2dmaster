import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { StatusBar } from 'react-native';

const App = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      <StatusBar
      backgroundColor={'#4CAF50'}
      barStyle={'light-content'}

      />
      {!isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;

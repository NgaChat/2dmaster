// ThemeToggleSwitch.js

import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../services/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeToggleSwitch = () => {
    const { theme, toggleTheme } = useTheme();
  
    const toggleSwitch = async () => {
      toggleTheme(); // Toggle theme in context
    };
  
    return (
      <View style={styles.themeToggleContainer}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>{theme === 'dark' ? 'Light' : 'Dark' }</Text>
        <Switch
          value={theme === 'dark'} // Use theme state to set the Switch value
          onValueChange={toggleSwitch} // Call toggleSwitch function on switch change
          thumbColor="#FFFFFF"
          trackColor={{ false: '#CCCCCC', true: '#888888' }}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    themeToggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10,
    },
  });
  
  export default ThemeToggleSwitch;
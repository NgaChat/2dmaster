// ThemeContext.js

import React, { createContext, useState, useContext,useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/themes'; // Import your themes
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is light

  useEffect(() => {
    const loadThemeState = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme state from AsyncStorage:', error);
      }
    };

    loadThemeState();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme state to AsyncStorage:', error);
    }
  };

  const themeContextValue = {
    theme,
    toggleTheme,
    colors: theme === 'dark' ? darkTheme : lightTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
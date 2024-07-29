import React from 'react';
import { View, StyleSheet } from 'react-native';
import  Icon  from '@components/Icon';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Icon name="cogs" size={30} color="#900" type="FontAwesome" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

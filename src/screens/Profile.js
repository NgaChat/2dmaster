import React from 'react';
import { View, StyleSheet } from 'react-native';
import  Icon  from '@components/Icon';
import { useNavigation } from '@react-navigation/native';

const SelectPaymentScreen= (props) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Select Payment',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Icon name="cogs" size={30} color="#900" type="FontAwesome" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
export default SelectPaymentScreen;
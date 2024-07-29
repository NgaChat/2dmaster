import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';

const SelectPaymentScreen = (props) => {
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

  const [amount, setAmount] = useState('');


  return (
    <View style={styles.container}>
      <View style={styles.btn_container}>
        <TouchableOpacity style={[styles.paybtn, { backgroundColor: '#0051A1', }]}>
          <Text style={{ fontSize: 50, color: 'white' }} >KPAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paybtn, { backgroundColor: '#FFD609', }]}>
          <Text style={{ fontSize: 50, color: 'black' }} >WPAY</Text>
        </TouchableOpacity>


      </View>
      <View style={{ marginTop: 30 }} >

        <Text style={{ marginBottom: 10 }} >Enter Amount</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f0f0f0', }]}
          onChangeText={setAmount}
          value={amount}
          placeholder="Type here"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          returnKeyType="done"
          secureTextEntry={false}
          multiline={false}
          maxLength={200}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
        />

        <Text style={{ marginBottom: 10 }} >လုပ်ဆောင်မှုအမှတ်စဉ်</Text>
        <TextInput
          style={[styles.input, { backgroundColor: '#f0f0f0', }]}
          // onChangeText={setText}
          // value={text}
          placeholder="နောက်ဆုံး ၆ လုံး"
          placeholderTextColor="#888"
          keyboardType="number-pad"
          returnKeyType="done"
          secureTextEntry={false}
          multiline={false}
          maxLength={200}
          onFocus={() => console.log('Focused')}
          onBlur={() => console.log('Blurred')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10

  },
  paybtn: {
    width: '40%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
export default SelectPaymentScreen;
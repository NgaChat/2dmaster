import React from 'react';
import { View,StyleSheet } from 'react-native';
import { Button, Card, Text, Avatar, IconButton } from 'react-native-paper';

export default function Dashboard({ navigation }) {
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    amount: '1000',
  };
  return (
    <View style={styles.container}>
    <View style={styles.card}>
        <Card.Title
            title={profile.name}
            subtitle={profile.email}
            left={(props) => <Avatar.Text {...props} label={profile.name[0]} />}
        />
        <Card.Content>
            <Text style={styles.amountText}>Amount: ${profile.amount}</Text>
        </Card.Content>

        <View style={styles.body} >
              <View>
                <Text style={{fontSize:50}} >60</Text>
              </View>
        </View>
        
    </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
  },
  card: {
      margin: 20,
      borderRadius: 10,
      // elevation: 0.1,
      padding: 10
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
},
body:{

}

});
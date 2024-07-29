import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Text, Avatar, IconButton } from 'react-native-paper';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({ route }) => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Payment',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    const profile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        amount: '1000',
    };

    const handleHistory = () => {
        console.log('History');
        // Navigate to history screen or perform history action
    };

    const handleWithdrawal = () => {
        console.log('Withdrawal');
        // Perform withdrawal action
    };

    const handleDeposit = () => {
        navigation.navigate('SelectPayment')
        // Perform deposit action
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
                <View style={styles.actions}>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }} >
                        <TouchableOpacity style={styles.btn} >
                            <Icon name={'history'} size={25} color={'#f54d27'} type="MaterialIcons" />
                            <Text style={{ color: '#f54d27', marginTop: 5 }} >History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} >
                            <Icon name={'money-bill-trend-up'} size={25} color={'#f54d27'} type="FontAwesome6" />
                            <Text style={{ color: '#f54d27', marginTop: 5 }} >Withdrawal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeposit} style={styles.btn} >
                            <Icon name={'money-bill-wave'} size={25} color={'#f54d27'} type="FontAwesome6" />
                            <Text style={{ color: '#f54d27', marginTop: 5 }} >Deposit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

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
    btn: {
        backgroundColor: 'rgba(250, 76, 76, 0.30)',
        width: '30%',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10
    },
    amountText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 20,
        alignItems: 'center',

    },
    button: {
        // marginVertical: 10,
        width: '30%',
        height: 50,
        marginLeft: 0,
        borderRadius: 10,
        backgroundColor: 'white'
    },
});

export default PaymentScreen;

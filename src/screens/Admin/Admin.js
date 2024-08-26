import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Admin = () => {
    const navigation = useNavigation();
    const [entries, setEntries] = useState([{ title: '', data: '' }]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Admin',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#F44336',
            },
            headerTintColor: '#fff',
        });
    }, [navigation]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://app.hsattwinthtet.tech/daily');
            const result = await response.json();

            if (result.status === 'success') {
                setEntries(result.data);
            } else {
                Alert.alert('Error', 'Failed to load data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const handleUpdate = async (index) => {
        try {
            const response = await fetch('https://app.hsattwinthtet.tech/daily', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: entries[index].title,
                    data: entries[index].data,
                }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                ToastAndroid.show('Data updated successfully!', ToastAndroid.SHORT);
                fetchData(); // Reload data after update
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error updating data:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const handleAddNew = () => {
        setEntries([...entries, { title: '', data: '' }]);
        // fetchData(); // Refresh data after adding a new entry
    };

    const handleChange = (text, index, field) => {
        const newEntries = [...entries];
        newEntries[index][field] = text;
        setEntries(newEntries);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {entries.map((entry, index) => (
                <View key={index} style={styles.entryContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Title"
                        placeholderTextColor="#555" // Darker placeholder for visibility
                        value={entry.title}
                        onChangeText={(text) => handleChange(text, index, 'title')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Data"
                        placeholderTextColor="#555" // Darker placeholder for visibility
                        value={entry.data}
                        onChangeText={(text) => handleChange(text, index, 'data')}
                    />
                    <Button title="Update" onPress={() => handleUpdate(index)} />
                </View>
            ))}
            <Button title="Add New" onPress={handleAddNew} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff', // White background for the container
    },
    entryContainer: {
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
        color: '#000', // Dark text color for visibility
    },
});

export default Admin;

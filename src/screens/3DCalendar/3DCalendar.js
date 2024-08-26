import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fSize, scaleHeight, scaleWidth } from '../../services/Scale';
const { width } = Dimensions.get('window');
import { loadInterAds, showInterAd } from '../../services/adService'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const CalendarHeader = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '3D Calendar',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#F44336',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: '900',
            },
        });
    }, [navigation]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [calendarData, setCalendarData] = useState(null);

    useEffect(() => {
        loadInterAds()
        // Fetch calendar data when the year changes
        const fetchCalendarData = async () => {
            try {
                const response = await fetch(`https://app.hsattwinthtet.tech/3d-calendar?date=${year}-01`);
                const data = await response.json();
                setCalendarData(data);
                showInterAd()
            } catch (error) {
                console.error('Error fetching calendar data:', error);
            }
        };

        fetchCalendarData();
    }, [year]);

    const handlePreviousYear = () => {
        setYear(prevYear => prevYear - 1);
    };

    const handleNextYear = () => {
        setYear(prevYear => prevYear + 1);
    };

    const getMonthName = (monthNumber) => {
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return monthNames[monthNumber - 1] || "Invalid month";
    };
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlePreviousYear}>
                    <Icon name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.year}>{year}</Text>
                <TouchableOpacity onPress={handleNextYear}>
                    <Icon name="arrow-right" size={24} color="#000" />
                </TouchableOpacity>


            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 }} >
                {calendarData && calendarData.data.map((item, index) => {
                    if (item['3d'].length > 0) {
                        return (
                            <View key={index} style={styles.month} >
                                <Text style={{ color: 'white', textAlign: 'center', marginTop: 3 }} >{getMonthName(item.month)}</Text>
                                <Text style={{ color: '#8BC34A', textAlign: 'center', marginTop: 8, fontSize: fSize(15), fontWeight: '900' }} >{item['3d'][0]['three_d']}</Text>
                                <Text style={{ color: '#8BC34A', textAlign: 'center', marginTop: 3, fontSize: fSize(15), fontWeight: '900' }} >{item['3d'][1] ? item['3d'][1]['three_d'] : '❎'}</Text>
                            </View>
                        )
                    }
                })}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
                <BannerAd
                    unitId="ca-app-pub-9279048532768395/1808210265" // Test Ad Unit ID
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => console.log('from 3d Banner Ad Loaded')}
                    onAdFailedToLoad={(error) => console.error('Banner Ad Failed to Load:', error)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    year: {
        fontSize: 24,
        marginHorizontal: 20,
        color: 'black'
    },
    month: {
        width: (width / 4) - 25,
        height: scaleHeight(80),
        backgroundColor: '#F44336',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    }
});

export default CalendarHeader;

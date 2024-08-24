import React, { useState, useEffect,useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, RefreshControl, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { fSize, scaleHeight } from '../../services/Scale';
import { Celo, Gift } from 'iconsax-react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd ,AdEventType} from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)
const { width } = Dimensions.get('window');

const GiftScreen = () => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Gift',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#F44336',
            },
            headerTintColor: 'white',
        });
    }, [navigation]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const bannerRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log(AdEventType)
          setLoaded(true);
        });
    
        // Start loading the interstitial straight away
        interstitial.load();
    
        // Unsubscribe from events on unmount
        return unsubscribe;
      }, [])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://sheetdb.io/api/v1/faqijm43duage');
            setData(response.data);
        } catch (error) {
            console.error(error);
            // Optionally, you could show an alert or a message to the user here
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const giftView = (item) => {
        navigation.navigate('GiftView', { data: item });
    };
    const handlePress = () => {
        interstitial.show();
        // Add your link to the Telegram channel here
        const telegramUrl = 'https://t.me/twodmaster_app';
        // This will open the link in the user's browser or Telegram app
        Linking.openURL(telegramUrl);
      };

    return (
        <View style={styles.container}>
            <BannerAd ref={bannerRef} unitId={'ca-app-pub-3940256099942544/9214589741'} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#F44336" style={styles.loader} />
                ) : (
                    <View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 30 }}>
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <TouchableOpacity key={item.id} onPress={() => giftView(item)} >
                                        <View style={styles.box} >

                                            <Gift size={70} color={'#F44336'} variant={'Bold'} />
                                        </View>
                                        <Text style={{ marginTop: 10, color: '#F44336', fontSize: fSize(12), textAlign: 'center', paddingHorizontal: 5, fontWeight: 'bold' }} >{item.title}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <Text>No data available</Text>
                            )}
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handlePress}>
                            <Text style={styles.text}>📢 Join Telegram Channel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    box: {
        width: (width / 3) - 20,
        height: scaleHeight(80),
        marginTop: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // Android elevation
        elevation: 1,
        borderColor: '#F44336',
        borderWidth: 1
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#0088cc', // Telegram blue
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop:30
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GiftScreen;

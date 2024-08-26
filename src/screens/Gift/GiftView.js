import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from '@components/Icon';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { fSize } from '../../services/Scale';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const GiftView = (props) => {
  const route = useRoute();
  const { data } = route.params;

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

  useEffect(() => {
    console.log(data)
  }, [])


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: fSize(20), textAlign: 'center', marginTop: 20, color: '#F44336', fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 2 }} >{data.title}</Text>
      <View style={[{ marginTop: 30 }, data.style, styles.box]} >
        <Text style={{ fontSize: fSize(22), paddingVertical: 30, letterSpacing: 3, fontWeight: 'bold', color: 'green' }} >{data.data}</Text>
      </View>
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId="ca-app-pub-9279048532768395/1808210265" // Test Ad Unit ID
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => console.log('Banner Ad Loaded')}
          onAdFailedToLoad={(error) => console.error('Banner Ad Failed to Load:', error)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'

  },
  box: {
    width: '80%',

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
  },
  bannerContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
},
});
export default GiftView;
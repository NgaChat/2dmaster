import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { fSize } from '@services/Scale';
import { scaleHeight } from '../../services/Scale';
import io from 'socket.io-client';
import SocketIOClient from "socket.io-client/dist/socket.io.js";

// const SOCKET_URL = 'http://192.168.108.8:3001';
const SOCKET_URL = 'http://app.hsattwinthtet.tech:3001';
const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '2D Master',
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [period, setPeriod] = useState('AM');
  const [live, setLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [blinkData, setBlinkData] = useState('');
  const [closeDay, setCloseDay] = useState(false)



  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'], // Use WebSocket transport
    });

    socket.on('scrapedData', (data) => {
      setBlinkData(data);
     
    });

    return () => {
      socket.disconnect();
    };
  }, []);






  const fetchData = async () => {
    try {
      const response = await axios.get('https://mm2d3dlive.com/api/v3/home', {
        headers: {
          'Authorization': ' Basic MkQzRDpOb3RoaW5nSXNTYWZl',
        },
      });

      setData(response.data);
      
      if(response.data['2d']){
        setLive(response.data['2d'].live);
      }else{
        setCloseDay(true)
      }
      
      setLoading(false);
    } catch (error) {
      console.error(error);
    }


  };





  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      const interval = setInterval(fetchData, 10000); // Fetch data every minute
      return () => clearInterval(interval);
    }
  }, [shouldFetch]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const now = new Date();
      const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      const morningStart = 9 * 3600; // 9:00 AM
      const morningEnd = 12 * 3600 + 1 * 60 + 10; // 12:01:10 PM
      const afternoonStart = 14 * 3600; // 2:00 PM
      const afternoonEnd = 16 * 3600 + 30 * 60 + 10; // 4:30:10 PM

      const isMorningBlink = (currentTime >= morningStart && currentTime <= morningEnd);
      const isAfternoonBlink = (currentTime >= afternoonStart && currentTime <= afternoonEnd);

      if (isMorningBlink || isAfternoonBlink) {
        setIsVisible(prev => !prev); // Blink AM or PM section
        setShouldFetch(true);
        // Fetch data when blinking
      } else {
        setIsVisible(true); // Ensure visibility is true when not blinking
        setShouldFetch(true);
        // Ensure fetching is enabled outside blink intervals
      }
    }, 1500); // Adjust blink speed if necessary

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // If the time is after 2:00 PM, set it to PM, otherwise AM
      if (hours > 14 || (hours === 14 && minutes >= 0)) {
        setPeriod('PM');
      } else {
        setPeriod('AM');
      }
    };

    const interval = setInterval(checkTime, 1000); // Check every second
    return () => clearInterval(interval);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['blue', 'green', 'red']} />
    }>
      {!loading &&
        <View style={styles.largeText}>
          {closeDay?
            <Text style={[styles.mainText,{fontSize:fSize(80)}]}>CLOSE</Text>
           :
          <Text style={styles.mainText}>
            {period === 'AM' ? live ? (isVisible ? blinkData.twod : '') : data["2d"]?.["am"]?.two_d :
               live ? (isVisible ? blinkData.twod : '') : data["2d"]?.["pm"]?.two_d}
            {/* {period === 'AM' ? (isVisible ? blinkData.twod : '') : (period === 'PM' ? (isVisible ? blinkData.twod : '') : '') } */}
          </Text>
          }
          <Text style={styles.updatedText}>
            Updated <Text style={styles.checkmark}>{!live ? '✔' : ''}</Text> : {period === 'AM' ? data["2d"]?.["am"]?.updated_at : data["2d"]?.["pm"]?.updated_at}
          </Text>
        </View>
      }

      <View style={styles.redBox}>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>12:01 PM</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>SET</Text>
            <Text style={styles.infoValue}>
              {isVisible ? live ? blinkData?.set : data["2d"]?.am?.set : ''}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>VALUE</Text>
            <Text style={styles.infoValue}>
              {isVisible ? live ? blinkData?.set : data["2d"]?.am?.val : ''}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>2D</Text>
            {live && period === 'AM' ?
              <Text style={styles.infoValue}>
                - -
              </Text>
              :
              <Text style={[styles.infoValue,{color:'#8BC34A'}]}>
                {period === 'AM' ? isVisible ? (live ? '- -' : data["2d"]?.am?.two_d) : '' : data["2d"]?.am?.two_d}
              </Text>
            }
          </View>

        </View>
      </View>

      <View style={styles.redBox}>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>4:30 PM</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>SET</Text>
            <Text style={styles.infoValue}>
              {isVisible ? live ? blinkData?.set : data["2d"]?.pm?.set : ''}

              {/* {period === 'PM' ? isVisible ? data["2d"]?.pm?.set : '' : data["2d"]?.pm?.set} */}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>VALUE</Text>
            <Text style={styles.infoValue}>
              {/* {period === 'PM' ? isVisible ? data["2d"]?.pm?.val : '' : data["2d"]?.pm?.val} */}
              {isVisible ? live ? blinkData?.value : data["2d"]?.pm?.val : ''}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>2D</Text>
            {live && period === 'PM' ?
              <Text style={styles.infoValue}>
                - -
              </Text>
              :
              <Text style={[styles.infoValue,{color:'#8BC34A'}]}>
                {period === 'PM' ? isVisible ? (live ? '- -' : data["2d"]?.pm?.two_d) : '' : data["2d"]?.pm?.two_d}
              </Text>
            }
          </View>

        </View>
      </View>

      <View style={styles.periodContainer}>
        <View style={styles.periodBox}>
          <Text style={styles.periodText}>9:00 AM</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>Modern</Text>
          <Text style={styles.periodText}>{data["2d"]?.am?.modern}</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>Internet</Text>
          <Text style={styles.periodText}>{data["2d"]?.am?.internet}</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>TW</Text>
          <Text style={styles.periodText}>{data["2d"]?.am?.tw}</Text>
        </View>
      </View>

      <View style={styles.periodContainer}>
        <View style={styles.periodBox}>
          <Text style={styles.periodText}>2:00 PM</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>Modern</Text>
          <Text style={styles.periodText}>{data["2d"]?.pm?.modern}</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>Internet</Text>
          <Text style={styles.periodText}>{data["2d"]?.pm?.internet}</Text>
        </View>
        <View style={styles.periodBox}>
          <Text style={styles.periodLabel}>TW</Text>
          <Text style={styles.periodText}>{data["2d"]?.pm?.tw}</Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f5f6f7',
  },
  largeText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: fSize(140),
    fontWeight: '900',
    color: '#8BC34A',
  },
  updatedText: {
    fontSize: fSize(12),
    color: 'black',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  checkmark: {
    color: 'green',
  },
  redBox: {
    backgroundColor: '#F44336',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: scaleHeight(105),
  },
  timeTextContainer: {
    paddingVertical: 15,
  },
  timeText: {
    color: 'white',
    fontSize: fSize(15),
    fontWeight: '900',
    textAlign: 'center',
  },
  separator: {
    backgroundColor: 'white',
    height: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    
  },
  infoBox: {
    alignItems: 'center',
    width: width / 3,
  },
  infoLabel: {
    color: '#d5e6da',
    fontSize: fSize(12),
    fontWeight: 'bold',
  },
  infoValue: {
    color: 'white',
    marginTop: 5,
    fontWeight: '900',
    fontSize: fSize(17),
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#F44336',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  periodBox: {
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:5
  },
  periodText: {
    fontSize: fSize(19),
    color: 'white',
    fontWeight: '900',
  },
  periodLabel: {
    fontSize: fSize(12),
    color: '#d5e6da',
    fontWeight: 'bold',
  },
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Dimensions, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { fSize, scaleHeight, scaleWidth } from '../../services/Scale';
import { loadInterAds, showInterAd } from '../../services/adService'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

const { width } = Dimensions.get('window');

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Calendar',
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

  useEffect(() => {
    loadInterAds();
    const initialMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
    setCurrentMonth(initialMonth);
    fetchData(initialMonth);
  }, []);

  const fetchData = async (month) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://app.hsattwinthtet.tech/2d-calendar?date=${month}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleMonthChange = (month) => {
    const newMonth = month.dateString.slice(0, 7); // YYYY-MM format
    setCurrentMonth(newMonth);
    setData([]);
    fetchData(newMonth);
  };

  const markedDates = data.data?.reduce((acc, curr) => {
    if (curr["2d"].is_close_day) {
      acc[curr.date] = { marked: true, dotColor: 'black', disabled: true };
    } else {
      acc[curr.date] = { marked: false };
    }
    return acc;
  }, {}) || {};

  const getDayData = (date) => {
    const dayData = data.data?.find(item => item.date === date);
    return dayData ? dayData["2d"] : null;
  };

  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  };

  const DayComponent = ({ date }) => {
    const dayData = getDayData(date.dateString);

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDayData(dayData);
          setModalVisible(true);
          showInterAd();
        }}
        style={[styles.dayContainer, { backgroundColor: '#F44336' }]}
      >
        <Text style={styles.dayText}>{date.day}</Text>
        {isLoading ?
          <ActivityIndicator size="small" color="white" />
          :
          <View>
            {dayData && (
              <View>
                {dayData.is_close_day ? (
                  <Text style={{ fontSize: fSize(10), textAlign: 'center' }}>✖️</Text>
                ) : (
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Text style={styles.dataText}>
                      {dayData.am ? `${dayData.am.two_d}` : ''}
                    </Text>
                    <Text style={styles.dataText}>
                      {dayData.pm ? `${dayData.pm.two_d}` : ''}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        }
      </TouchableOpacity>
    );
  };

  const handleSelect = (data) => {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <Calendar
          markedDates={markedDates}
          dayComponent={({ date }) => <DayComponent date={date} />}
          onMonthChange={(month) => handleMonthChange(month)}
          onDayPress={day => {
            console.log('selected day', day);
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: 'orange',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);

        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={() => { setModalVisible(false); loadInterAds(); }}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            <ScrollView>
              {selectedDayData ? (
                <View>
                  <View style={{ backgroundColor: 'white', paddingVertical: 10, borderRadius: 15, }} >
                    {/* <Text style={styles.modalTitle}>{selectedDayData.date}</Text> */}
                    <View>
                      <Text style={{ color: 'black', textAlign: 'center' }} >12:01 PM</Text>
                      <View style={{ backgroundColor: '#F44336', height: 0.7, marginVertical: 10 }} />
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }} >
                        <View style={{ alignItems: 'center', width: width / 3 }} >
                          <Text style={{ fontSize: fSize(12), color: 'grey' }}>Set</Text>
                          <Text style={{ color: 'black', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.am?.set || '--'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', width: width / 3 }} >
                          <Text style={{ fontSize: fSize(12), color: 'grey' }}>Value</Text>
                          <Text style={{ color: 'black', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.am?.val || '--'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', width: width / 3 }} >
                          <Text style={{ fontSize: fSize(12), color: 'grey' }}>2D</Text>
                          <Text style={{ color: 'green', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.am?.two_d || '--'}</Text>
                        </View>
                      </View>
                    </View>

                  </View>

                  <View style={{ backgroundColor: 'white', paddingVertical: 10, borderRadius: 15, marginTop: 10 }} >
                    {/* <Text style={styles.modalTitle}>{selectedDayData.date}</Text> */}

                    <Text style={{ color: 'black', textAlign: 'center' }} >4:30 PM</Text>
                    <View style={{ backgroundColor: '#F44336', height: 0.7, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }} >
                      <View style={{ alignItems: 'center', width: width / 3 }} >
                        <Text style={{ fontSize: fSize(12), color: 'grey' }}>Set</Text>
                        <Text style={{ color: 'black', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.pm?.set || '--'}</Text>
                      </View>
                      <View style={{ alignItems: 'center', width: width / 3 }} >
                        <Text style={{ fontSize: fSize(12), color: 'grey' }}>Value</Text>
                        <Text style={{ color: 'black', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.pm?.val || '--'}</Text>
                      </View>
                      <View style={{ alignItems: 'center', width: width / 3 }} >
                        <Text style={{ fontSize: fSize(12), color: 'grey' }}>2D</Text>
                        <Text style={{ color: 'green', fontSize: fSize(14), fontWeight: '900' }}>{selectedDayData.pm?.two_d || '--'}</Text>
                      </View>
                    </View>

                  </View>

                  <View style={{ backgroundColor: 'white', paddingVertical: 10, borderRadius: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                    <Text style={{ color: 'black', fontWeight: 'bold' }} >9:00 AM</Text>
                    <View style={{ alignItems: 'center' }} >
                      <Text>Modern</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.am?.modern || '--'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }} >
                      <Text>Internet</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.am?.internet || '--'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }} >
                      <Text>TW</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.am?.tw || '--'}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'white', paddingVertical: 10, borderRadius: 15, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
                    <Text style={{ color: 'black', fontWeight: 'bold' }} >2:00 AM</Text>
                    <View style={{ alignItems: 'center' }} >
                      <Text>Modern</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.pm?.modern || '--'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }} >
                      <Text>Internet</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.pm?.internet || '--'}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }} >
                      <Text>TW</Text>
                      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: fSize(14) }} >{selectedDayData.pm?.tw || '--'}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <Text>No data available</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }} >
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dayContainer: {
    padding: 5,
    width: scaleWidth(50),
    height: scaleHeight(50),
    borderRadius: 10,
  },
  dayText: {
    fontSize: fSize(10),
    color: '#d5e3d9',
    textAlign: 'center',
  },
  dataText: {
    fontSize: fSize(13),
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: '#F44336',
    borderRadius: 10,
    // alignItems: 'center',

  },
  modalTitle: {
    fontSize: fSize(13),
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default CalendarScreen;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Dashboard';
import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import ThreeDCalendarStackNavigator from './ThreeDCalendarStackNavigator';
import GiftStackNavigator from './GiftStackNavigator'
import Icon from '../components/Icon';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator'
import { HomeHashtag,MoneySend,Gift,Calendar, Calendar2 } from 'iconsax-react-native';
import CalendarStackNavigator from './CalendarStackNavigator';
import AdminStackNavigator from './AdminStackNavigator';


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const getTab = (r) => {
    const rr = getFocusedRouteNameFromRoute(r)
    if (rr == '') return 'none'
    return 'flex';
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { display: 'none' },
        headerStyle: {
          backgroundColor: '#fffff',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: '#F44336',
          display: getTab(route),
          height:60
         

        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            // iconName = focused ? 'home-heart' : 'home-heart';
            return <HomeHashtag size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          } else if (route.name === 'Settings') {
            // iconName = focused ? 'payments' : 'payments';
            return <MoneySend size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          } else if (route.name === 'Gift') {
            return <Gift size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          } else if (route.name === 'Profile') {
            return <MoneySend size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          } else if (route.name === 'Calendar') {
            return <Calendar size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          }else if (route.name === 'ThreeDCal') {
            return <Calendar2 size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          }
          // else if (route.name === 'Admin') {
          //   return <Calendar2 size={focused?40:20} color={focused ? 'white':'grey'} variant={focused?'Bold':'Linear'} />
          // }

          return <Icon name={iconName} size={30} color={'color'} type="MaterialCommunityIcons" />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" options={{ headerShown: false }} component={HomeStackNavigator} />
      <Tab.Screen name="Gift" options={{ headerShown: false }} component={GiftStackNavigator} />
      <Tab.Screen name="Calendar" options={{ headerShown: false }} component={CalendarStackNavigator} />
      <Tab.Screen name="ThreeDCal" options={{ headerShown: false }} component={ThreeDCalendarStackNavigator} />
      {/* <Tab.Screen name="Admin" options={{ headerShown: false }} component={AdminStackNavigator} /> */}
      {/* <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { StatusBar, Alert, Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { loadOpenAd, showOpenAd, status } from './src/services/adService';
import BootSplash from "react-native-bootsplash";


const App = ({ isAuthenticated }) => {

  React.useEffect(() => {
    loadOpenAd()
    // OneSignal Initialization
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize("de87de6f-1dad-47e9-a52c-762c168b6499");
    OneSignal.Notifications.requestPermission(true);

    // Prompt for Push Notification Permission
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   console.log("Prompt response:", response);
    //   if (response) {
    //     Alert.alert("Thank You!", "You've enabled notifications.");
    //   } else {
    //     Alert.alert("Notifications Disabled", "You can enable notifications in the app settings.");
    //   }
    // });

    // Check for app updates
    
    VersionCheck.needUpdate()
      .then(async res => {
        if (res.isNeeded) {
          Linking.openURL(res.storeUrl);  // open store if update is needed.
        }
      });
  }, []);

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <StatusBar
        backgroundColor={'#F44336'}
        barStyle={'dark-content'}
      />
      {!isAuthenticated ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;

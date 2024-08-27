// PrivacyPolicy.js
import React from 'react';
import { ScrollView, Text, StyleSheet, View, Linking, TouchableOpacity, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';

const PrivacyPolicy = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Privacy Policy',
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

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const handleBackToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.date}>Effective Date: {new Date().toLocaleDateString()}</Text>
        
        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.bold}>2D Master</Text>. We are committed to protecting your privacy and ensuring a safe experience while using our application. This Privacy Policy explains how we handle your information when you use our app. By using our app, you agree to the practices described in this policy.
        </Text>

        <Text style={styles.subHeader}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>2D Master</Text> does not collect any personal data or information from users. We do not require registration or account creation, and we do not gather or store any data related to your interactions within the app.
        </Text>

        <Text style={styles.subHeader}>Push Notifications</Text>
        <Text style={styles.paragraph}>
          We use push notifications to provide you with updates and relevant information about the app. You can manage or disable these notifications through your device's settings.
        </Text>

        <Text style={styles.subHeader}>Google Ads</Text>
        <Text style={styles.paragraph}>
          We use Google Ads to display advertisements within the app. Google may use cookies to serve ads based on your visit to our app and other sites. You can learn more about Google's advertising practices and how to opt out of personalized ads by visiting{' '}
          <TouchableOpacity onPress={() => openLink('https://policies.google.com/privacy')}>
            <Text style={styles.link}>Google's Privacy & Terms page</Text>
          </TouchableOpacity>.
        </Text>

        <Text style={styles.subHeader}>Data Security</Text>
        <Text style={styles.paragraph}>
          Although we do not collect personal data, we still take reasonable measures to protect the security and integrity of the app. However, no method of transmission over the internet or electronic storage is 100% secure.
        </Text>

        <Text style={styles.subHeader}>Third-Party Links</Text>
        <Text style={styles.paragraph}>
          Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
        </Text>

        <Text style={styles.subHeader}>Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update our Privacy Policy from time to time. Any changes will be posted on this page. We encourage you to review this Privacy Policy periodically for any updates.
        </Text>

        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Email:</Text> <TouchableOpacity onPress={() => openLink('mailto:hsattwinthtet@gmail.com')}>
            <Text style={styles.link}>hsattwinthtet@gmail.com</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Website:</Text> <TouchableOpacity onPress={() => openLink('https://app.hsattwinthtet.tech')}>
            <Text style={styles.link}>app.hsattwinthtet.tech</Text>
          </TouchableOpacity>
        </Text>
        
        {/* Add button to navigate back to Home */}
        <Button title="Back to Home" onPress={handleBackToHome} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#F44336'
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicy;

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

var firebaseConfig = {
  apiKey: 'AIzaSyBPm46Yqq4vkJ0_hEj9-nsbtm3Z8XyUv6A',
  authDomain: 'activity-club-3dfcf.firebaseapp.com',
  projectId: 'activity-club-3dfcf',
  storageBucket: 'activity-club-3dfcf.appspot.com',
  messagingSenderId: '100041602249',
  appId: '1:100041602249:web:1d3e659dc288fe89cc8918',
};

// Below IF checks that we are not running any fb instance atm (avoids crashing)
if (firebase.apps.length === 0) {
  // initializes fb
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

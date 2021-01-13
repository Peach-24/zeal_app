import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyBPm46Yqq4vkJ0_hEj9-nsbtm3Z8XyUv6A",
  authDomain: "activity-club-3dfcf.firebaseapp.com",
  projectId: "activity-club-3dfcf",
  storageBucket: "activity-club-3dfcf.appspot.com",
  messagingSenderId: "100041602249",
  appId: "1:100041602249:web:1d3e659dc288fe89cc8918",
};
// Below IF checks that we are not running any fb instance atm (avoids crashing)
if (firebase.apps.length === 0) {
  // initializes fb
  firebase.initializeApp(firebaseConfig);
}
// React
import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// React-Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./components/Main";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";

// Redux
import { Provider } from "react-redux";

import store from "./components/main/redux/store";

const Stack = createStackNavigator();

export const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          setLoggedIn(false);
          setLoaded(true);
        } else {
          setLoggedIn(true);
          setLoaded(true);
        }
      });
    }
  }, [loggedIn, loaded]);

  if (!loaded) {
    return <View style={{ flex: 1, justifyContent: "center" }}></View>;
  }
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;

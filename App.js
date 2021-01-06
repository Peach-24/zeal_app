import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// React
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// React-Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./components/Main";
import LandingScreen from "./components/auth/Landing";
import CameraScreen from "./components/main/PhotoCapture";
import UploadScreen from "./components/main/UploadMedia";
import RegisterScreen from "./components/auth/Register";

// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

var firebaseConfig = {
  apiKey: "AIzaSyBPm46Yqq4vkJ0_hEj9-nsbtm3Z8XyUv6A",
  authDomain: "activity-club-3dfcf.firebaseapp.com",
  projectId: "activity-club-3dfcf",
  storageBucket: "activity-club-3dfcf.appspot.com",
  messagingSenderId: "100041602249",
  appId: "1:100041602249:web:1d3e659dc288fe89cc8918",
};

const Stack = createStackNavigator();

// Below IF checks that we are not running any fb instance atm (avoids crashing)
if (firebase.apps.length === 0) {
  // initializes fb
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
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
  }
}

export default App;

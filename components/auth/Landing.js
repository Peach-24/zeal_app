import React, { Component, useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import * as firebase from "firebase";
import ZealNoTextSmall from "../../assets/zealNoTextSmall";
import store from "../main/redux/store";
import { fetchUser } from "../main/redux/reducers/userSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

const backgroundImage = require("../../assets/image1.jpeg");

const { width, height } = Dimensions.get("window");

const Landing = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const { navigation } = props;
  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <ZealNoTextSmall />
        </View>
        <Text style={styles.title}>Zeal</Text>
        <View style={styles.login}>
          <TextInput
            placeholder="email"
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.error}>Unable to login.</Text>
              <Text style={styles.error}>
                Please check your details and try again.
              </Text>
            </View>
          ) : (
            <Text />
          )}
          <TouchableOpacity
            onPress={() => onSignIn()}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.register}>
          <Text style={styles.noAccount}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Landing;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#ffffff",
    elevation: 8,
    backgroundColor: "#303030",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  main: {
    flex: 1,
    marginTop: -50,
    justifyContent: "center",
    textAlign: "center",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  login: {
    paddingHorizontal: 50,
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 45,
  },
  register: {
    marginTop: 30,
    paddingHorizontal: 50,
    alignItems: "center",
  },
  noAccount: {
    paddingVertical: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  input: {
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "white",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 2,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  errorBox: {
    margin: 20,
  },
});

import React, { Component, useState } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import * as firebase from "firebase";
import store from "../main/redux/store";
import { fetchUser } from "../main/redux/reducers/userSlice";

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
    <View style={styles.main}>
      <Text style={styles.title}>Zeal 🦓</Text>
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
        <Button onPress={() => onSignIn()} title="Login" />
      </View>
      <Text style={styles.noAccount}>Don't have an account? </Text>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 30,
    textTransform: "uppercase",
    textAlign: "center",
  },
  login: {
    padding: 50,
    marginTop: 50,
    marginBottom: 25,
  },
  noAccount: {
    textAlign: "center",
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

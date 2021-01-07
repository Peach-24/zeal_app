import React, { Component } from "react";
import { Text, View, Button, TextInput, StyleSheet } from "react-native";
import * as firebase from "firebase";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn() {
    const { name, email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {})
      .catch((err) => {});
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Zeal 🦓</Text>
        <View style={styles.login}>
          <TextInput
            placeholder="email"
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            style={styles.input}
          />
          <Button onPress={() => this.onSignIn()} title="Login" />
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
  }
}

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
    marginBottom: 50,
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
});

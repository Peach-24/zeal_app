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
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
          <Button onPress={() => this.onSignIn()} title="Login" />
        </View>
        <Text>
          Don't have an account?{" "}
          <Button
            title="Register"
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </Text>
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
    marginBottom: 100,
  },
  login: {
    padding: 70,
  },
});

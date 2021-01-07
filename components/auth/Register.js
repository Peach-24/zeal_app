import React, { Component } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isMatching: "",
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const {
      username,
      email,
      password,
      confirmPassword,
      isMatching,
    } = this.state;
    if (confirmPassword === password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              username,
              email,
            });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ isMatching: "Passwords do not match" });
    }
  }

  render() {
    const { isMatching } = this.state;
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Zeal 🦓</Text>
        <View style={styles.register}>
          <TextInput
            placeholder="username"
            style={styles.input}
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            placeholder="email"
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
          />
          {/* need to add warning for non-matching passwords */}
          <TextInput
            placeholder="confirm password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
          <Text style={styles.error}>{isMatching}</Text>
        </View>
        <Button onPress={() => this.onSignUp()} title="Sign up" />
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
  register: {
    padding: 60,
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
    marginTop: 10,
    fontSize: 18,
  },
});

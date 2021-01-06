import React, { Component } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
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
    const { username, email, password, confirmPassword } = this.state;
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
      this.setState;
    }
  }

  render() {
    const { isMatching } = this.state;
    return (
      <View style={styles.main}>
        {/* <Text style={styles.title}>Zeal 🦓</Text> */}
        <View style={styles.register}>
          <TextInput
            placeholder="username"
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            placeholder="email"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
          {/* need to add warning for non-matching passwords */}
          <TextInput
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
          <Button onPress={() => this.onSignUp()} title="Sign Up" />
        </View>
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
  register: {
    padding: 70,
  },
});

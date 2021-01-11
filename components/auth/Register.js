import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState("");

  const onSignUp = () => {
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
          return res.user.updateProfile({
            displayName: username,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsMatching("Passwords do not match");
    }
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Zeal 🦓</Text>
      <View style={styles.register}>
        <TextInput
          placeholder="username"
          style={styles.input}
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          placeholder="confirm password"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
        />
        <Text style={styles.error}>{isMatching}</Text>
      </View>
      <Button onPress={() => onSignUp()} title="Sign up" />
    </View>
  );
};

export default Register;

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

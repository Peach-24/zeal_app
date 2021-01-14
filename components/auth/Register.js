import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import ZealNoTextSmall from "../../assets/zealNoTextSmall";

const backgroundImage = require("../../assets/image1.jpeg");

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
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/activity-club-3dfcf.appspot.com/o/app_assets%2Fdefault-avatar.png?alt=media&token=df0a35dd-c2c7-4615-a586-74ff37ef5bc3",
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
    <ImageBackground source={backgroundImage} style={styles.image}>
      <View style={styles.main}>
        <View style={styles.logoContainer}>
          <ZealNoTextSmall />
        </View>
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
        <View style={styles.register}>
          <TouchableOpacity
            onPress={() => onSignUp()}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;

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
  register: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
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

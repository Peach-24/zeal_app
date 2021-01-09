import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, StyleSheet } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function UploadMedia(props, { navigation }) {
  const [caption, setCaption] = useState("");

  const uploadImage = async () => {
    const uri = props.route.params.image;

    const childPath = `submissions/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const res = await fetch(uri);
    const blob = await res.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("groups")
      .doc("0.hcwlt9l4kf")
      .collection("challenges")
      .doc("1")
      .collection("uploads")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        // the below means that it will go to the beginning route of our navigator in App
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.heading}>Tell people about your photo!</Text>
      <Image source={{ url: props.route.params.image }} style={{ flex: 1 }} />

      <Button title="Confirm" onPress={() => uploadImage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
  },
  tabIcon: {
    fontSize: 26,
    color: "white",
  },
});

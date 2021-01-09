import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
// import Icon from 'react-native-vector-icons';
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function PhotoCapture(props, { navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [caption, setCaption] = useState("");

  const challengeInfo = props.route.params.item;
  const groupDetails = props.route.params.groupDetails;
  console.log(groupDetails);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      if (galleryStatus.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const resetImage = async () => {
    if (image) {
      setImage(null);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // specify which types of media you want user to be able to select
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const uri = image;

    const childPath = `submissions/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const res = await fetch(uri);
    const blob = await res.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
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
      .doc(groupDetails.id)
      .collection("challenges")
      .doc(challengeInfo.id)
      .collection("uploads")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        // the below means that it will go to the beginning route of our navigator in App
        // props.navigation.popToTop();
        console.log("image upload successful");
      });
  };
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topicInfo}>
        <Text style={styles.topicTitle}>
          Challenge Topic: {challengeInfo.topic}
        </Text>
        <Text style={styles.topicDescription}>
          What will you submit for this challenge?
        </Text>
      </View>
      <>
        <View style={styles.cameraContainer}>
          {!image ? (
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.cameraArea}
              type={type}
              ratio={"1:1"}
            />
          ) : (
            <Image source={{ uri: image }} style={{ flex: 1 }} />
          )}
        </View>
        <View style={styles.cameraOptionsRow}>
          <Icon.Button
            // flip camera
            name="undo"
            size={30}
            style={styles.cameraBtn}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Icon.Button
            // take photo
            name="camera"
            size={30}
            style={styles.cameraBtn}
            onPress={() => takePhoto()}
          />
          <Icon.Button
            // Access gallery
            name="folder-open"
            size={30}
            style={styles.cameraBtn}
            onPress={() => pickImage()}
          />
        </View>
      </>
      <TextInput
        style={styles.captionBox}
        placeholder="Write a caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button
        title="Submit"
        style={styles.submitBtn}
        onPress={() => uploadImage()}
      ></Button>
      <Button
        title="Retake photograph"
        style={styles.submitBtn}
        onPress={() => resetImage()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    margin: 0,
  },
  cameraArea: {
    flex: 1,
    aspectRatio: 1,
  },
  topicTitle: {
    color: "darkgrey",
  },
  topicDescription: {
    // flex: 1,
    // textAlign: 'center',
  },
  topicDescription: {
    // flex: 1,
    // textAlign: 'center',
    paddingTop: 5,
    fontSize: 18,
  },
  topicInfo: {
    backgroundColor: "#FFF7",
    padding: 20,
  },
  cameraOptionsRow: {
    backgroundColor: "black",
    flexDirection: "row",
    width: "auto",
    justifyContent: "center",
  },
  cameraBtn: {
    backgroundColor: "black",
  },
  submitBtn: {
    paddingTop: 20,
    fontSize: 50,
  },
  captionBox: {
    backgroundColor: "white",
    padding: 5,
  },
});

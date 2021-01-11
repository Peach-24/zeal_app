import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatJoinDate, createGroupsString } from "../main/Utils/functions";
import { signOut } from "./redux/reducers/userSlice";
import { selectGroupsJoined } from "./redux/reducers/groupsSlice";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  TextInput,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
  const [user, setUser] = useState(firebase.auth().currentUser);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.displayName);
  const [emailUpdate, setEmailUpdate] = useState("");
  const [usernameUpdate, setUsernameUpdate] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const [uploadFinished, setUploadFinished] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(user.photoURL);
  const [newImage, setNewImage] = useState("");

  const groupsJoined = useSelector(selectGroupsJoined);
  const groupList = groupsJoined.map((group) => group.name);

  useEffect(() => {
    setImage(user.photoURL);
    setUsername(user.displayName);
    setEmail(user.email);
  }, [uploadFinished, usernameUpdate, emailUpdate]);

  const uploadImage = async () => {
    const uri = newImage;
    const childPath = `avatars/${user.uid}/${Math.random().toString(36)}`;
    const res = await fetch(uri);
    const blob = await res.blob();
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        updateUserPhotoURL(snapshot);
        console.log("uploaded to STORAGE");
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot, "<------ Task Error snapshot");
    };
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setNewImage(result.uri);
      uploadImage();
    }
  };

  const updateUserPhotoURL = (downloadURL) => {
    user
      .updateProfile({ photoURL: downloadURL })
      .then(function () {
        var photoURL = user.photoURL;
        setImage(photoURL);
        setUploadFinished(true);
        console.log(user, "<---- user profile details updated");
      })
      .catch((err) => {
        console.log(err, "<------ updateUserPhotoURL error");
      });
  };
  const updateAvatarImage = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === "granted");
    if (galleryStatus.status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
    pickImage();
    console.log("Change Photo");
  };

  const updateUsername = () => {
    if (username !== user.displayName && username !== "") {
      user
        .updateProfile({ displayName: username })
        .then(function () {
          console.log("Updated username successful.");
          setUsernameUpdate("Username changed.");
        })
        .catch(function (error) {
          console.log(error);
        });
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ email, username: username })
        .catch((err) => {
          setUsernameError(true);
          setUsernameUpdate(
            "Unable to change email. Please sign out and try again"
          );
        });
    }
  };
  const updateEmail = () => {
    if (email !== user.email && email !== "") {
      user
        .updateEmail(email)
        .then(function () {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({ username, email: email })
            .catch((err) => {
              console.log(err);
            });
          console.log("Update email successful.");
          setEmailUpdate("Email changed.");
        })
        .catch(function (error) {
          console.log(error, "<------- updateEmail Error");
          setEmailError(true);
          setEmailUpdate("Error: Please log out and try again");
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileBox}>
          <Image style={styles.profileImage} source={{ uri: image }} />

          <View style={styles.changePhoto}>
            <Entypo
              name="circle-with-plus"
              size={48}
              color="#fff"
              onPress={() => updateAvatarImage()}
            ></Entypo>
          </View>
        </View>

        <View>
          <Text style={styles.username}>{user.displayName}</Text>
          <Text style={styles.joinedDate}>
            Member since: {formatJoinDate(user.createdAt)}
          </Text>
        </View>
        <View style={styles.userForm}>
          <Text style={styles.inputDesc}> Username: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={username}
              style={styles.input}
              onChangeText={(input) => setUsername(input)}
            />
            <TouchableOpacity onPress={() => updateUsername()}>
              <Text style={styles.edit}>✍️</Text>
            </TouchableOpacity>
          </View>
          {!usernameError ? (
            <Text style={styles.success}>{usernameUpdate}</Text>
          ) : (
            <Text style={styles.error}>{emailUpdate}</Text>
          )}

          <Text style={styles.inputDesc}>Email: </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={email}
              style={styles.input}
              onChangeText={(input) => setEmail(input)}
            />
            <TouchableOpacity onPress={() => updateEmail()}>
              <Text style={styles.edit}>✍️</Text>
            </TouchableOpacity>
          </View>
          {!emailError ? (
            <Text style={styles.success}>{emailUpdate}</Text>
          ) : (
            <Text style={styles.error}>{emailUpdate}</Text>
          )}

          <Button
            title="Sign Out"
            onPress={() => signOut()}
            style={styles.SOButton}
          />
          <Text style={styles.groups}>Groups: </Text>
          <Text style={styles.groupsList}>{createGroupsString(groupList)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  changePhoto: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 50,
    // alignItems: "center",
  },
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  profileBox: {
    paddingTop: 25,
  },

  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf: "center",
    borderColor: "lightgrey",
    borderWidth: 5,
  },
  inputDesc: { fontSize: 16, margin: 5 },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    // borderRadius: 5,
    width: 200,
  },
  groupsList: {
    fontSize: 18,
  },
  SOButton: {
    flex: 1,
  },
  username: {
    flex: 1,
    fontSize: 30,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 5,
  },
  joinedDate: {
    alignSelf: "center",
    paddingBottom: 20,
    fontSize: 16,
    color: "grey",
  },
  userForm: {
    margin: 0,
  },
  groupCard: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 5,
  },
  groups: { fontSize: 16, color: "grey", paddingTop: 20, paddingBottom: 10 },
  groupTitle: {
    fontSize: 18,
  },
  success: {
    color: "green",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  edit: {
    fontSize: 25,
    padding: 8,
    justifyContent: "center",
  },
});

export default Profile;

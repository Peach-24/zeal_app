import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGroupsJoined } from "./redux/reducers/groupsSlice";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { signOut } from "./redux/reducers/userSlice";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import EditAvatar from "./EditAvatar";
import * as firebase from "firebase";

const Profile = () => {
  const user = firebase.auth().currentUser;
  // const [avatarURL, setAvatarURL] = useState(user.photoURL);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.displayName);
  const groupsJoined = useSelector(selectGroupsJoined);

  console.log(user);

  const groupList = groupsJoined.map((group) => group.name);
  const createGroupsString = (arr) => {
    let finalStr = "";
    arr.forEach((group) => {
      finalStr += `📸 ${group}\n`;
    });
    return finalStr;
  };

  const updateAvatarImage = () => {
    console.log("Change Photo");
  };

  const updateDetails = () => {
    if (username !== user.displayName && username !== "") {
      user
        .updateProfile({ displayName: username })
        .then(function () {
          console.log("Updated username successful.");
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
          console.log(err);
        });
    }

    if (email !== user.email && email !== "") {
      user
        .updateEmail(email)
        .then(function () {
          console.log("Update email successful.");
        })
        .catch(function (error) {
          console.log(error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ username, email: email })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const formatJoinDate = (timestamp) => {
    let date = Date(timestamp);
    let splitArr = date.split(" ");
    const trimArr = splitArr.slice(1, 4);
    return trimArr.join("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 50 }}>
          {/* Default image to be uploaded to DB and pulled down from fireStore, user should be able to edit avatar from a list of default images, or upload an image using their camera. */}
          <Image
            style={styles.profileImage}
            source={{
              uri: user.photoURL,
            }}
          />

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
          <TextInput
            placeholder={username}
            style={styles.input}
            onChangeText={(input) => setUsername(input)}
          />
          <Text style={styles.inputDesc}>Email: </Text>
          <TextInput
            placeholder={email}
            style={styles.input}
            onChangeText={(input) => setEmail(input)}
          />
          <Button title="Update Details" onPress={() => updateDetails()} />
          <Text style={styles.inputDesc}>Groups: </Text>
          <Text style={styles.groupsList}>{createGroupsString(groupList)}</Text>
        </View>
        <View style={styles.SOButton}>
          <Button title="Sign Out" onPress={() => signOut()} />
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
    right: 0,
    width: 48,
    height: 48,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 50,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  inputDesc: { fontSize: 16, margin: 5 },
  input: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  groupsList: {
    fontSize: 18,
  },
  SOButton: {
    flex: 1,
    justifyContent: "flex-end",
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
  groupTitle: {
    fontSize: 18,
  },
});

export default Profile;

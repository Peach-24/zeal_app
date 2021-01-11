import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectGroupsJoined } from "../redux/reducers/groupsSlice";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { signOut } from "./redux/reducers/userSlice";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import EditAvatar from "./EditAvatar";
import * as firebase from "firebase";
//import firebase.js functions to obtain user details and posts

const Profile = () => {
  //state needs to contain an image in avatar???
  const [currentAvatar, setAvatar] = useState();
  const groupsJoined = useSelector(selectGroupsJoined);
  //change photo
  const user = firebase.auth().currentUser;
  const defaultAvatar = require("../../img/232-2329525_person-svg-shadow-default-profile-picture-png.png");
  const updateAvatarImage = () => {
    console.log("Change Photo");
  };

  // useEffect(() => {
  //   firebase.firestore().collection('users').doc(user.uid).collection('groupsJoined').get()
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 50 }}>
          {/* Default image to be uploaded to DB and pulled down from fireStore, user should be able to edit avatar from a list of default images, or upload an image using their camera. */}
          <Image style={styles.profileImage} source={defaultAvatar} />

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
          <Text style={styles.userName}>{user.displayName}</Text>
        </View>
        <View style={styles.userForm}>
          <Text>{user.email}</Text>
          <Text>{user.groupsJoined}</Text>
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
  SOButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  userName: {
    flex: 1,
    fontSize: 30,
    alignSelf: "center",
    padding: 10,
  },
  userForm: {
    padding: 10,
  },
  // text: {
  //   fontFamily: "HelveticaNeue",
  //   color: "#52575D",
  // },
});

export default Profile;

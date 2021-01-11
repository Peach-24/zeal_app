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
  const defaultAvatar = require("../../img/232-2329525_person-svg-shadow-default-profile-picture-png.png");
  const [currentAvatar, setAvatar] = useState(defaultAvatar);
  const groupsJoined = useSelector(selectGroupsJoined);
  console.log(groupsJoined);
  //change photo
  const user = firebase.auth().currentUser;
  const updateAvatarImage = () => {
    console.log("Change Photo");
  };
  const renderItem = ({ item }) => (
    <View style={styles.groupCard}>
      <Text
        style={styles.groupTitle}
        onPress={() => navigation.navigate("SingleGroup", { item })}
      >
        {item.name}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 50 }}>
          {/* Default image to be uploaded to DB and pulled down from fireStore, user should be able to edit avatar from a list of default images, or upload an image using their camera. */}
          <Image style={styles.profileImage} source={currentAvatar} />

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
          <Text>
            email: <TextInput placeholder={user.email} />
          </Text>
          <FlatList
            numColumns={1}
            data={groupsJoined}
            renderItem={renderItem}
            style={styles.groupsList}
          />
        </View>
        <View style={styles.SOButton}>
          <Button
            title="Update Details"
            onPress={() => console.log("update details")}
          />
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

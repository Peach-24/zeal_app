import * as firebase from "firebase";
require("firebase/firestore");
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { selectGroupsJoined } from "../redux/reducers/groupsSlice";
const backgroundImage = require("../../../assets/image1.jpeg");

export default function MyGroups({ navigation }) {
  const groupsJoined = useSelector(selectGroupsJoined);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.groupCard}>
        <Text
          style={styles.groupTitle}
          onPress={() => navigation.navigate("SingleGroup", { item })}>
          {item.name}
        </Text>
        <View style={styles.groupBody}>
          <Text>{item.description}</Text>
          <Text>Frequency: {item.frequency}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Groups</Text>
        </View>
        <FlatList
          numColumns={1}
          data={groupsJoined}
          renderItem={renderItem}
          style={styles.groupsList}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "relative",
  },
  header: {
    textAlign: "center",
    marginTop: 60,
  },
  headerText: {
    textAlign: "center",
    fontSize: 30,
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
  groupsList: {
    padding: 10,
  },
  groupTitle: {
    fontSize: 24,
  },
  groupBody: {
    paddingTop: 10,
  },
});

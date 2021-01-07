import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";
import {} from "react-native-gesture-handler";
require("firebase/firestore");

export default function SingleGroup(props) {
  const [challenges, setChallenges] = useState([]);
  const groupInfo = props.route.params.item;

  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupInfo.name)
      .collection("submissions")
      .get()
      .then((snapshot) => {
        // console.log(snapshot.docs);
        let challenges = snapshot.docs.map((task) => {
          const data = task.data();
          const id = task.id;
          return { id, ...data };
        });
        setChallenges(challenges);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.challengeCard}>
      <Text
        style={styles.challengeNum}
        onPress={() => navigation.navigate("SingleGroup", { item })}
      >
        {item.challengeNum}
      </Text>

      <Text style={styles.challengeTitle}>{item.topic}</Text>

      <TouchableOpacity>
        <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.groupName}>{groupInfo.name}</Text>
        <View style={styles.subHead}>
          <Text style={styles.description}>{groupInfo.description}</Text>
          <Text style={styles.members}>Members: 0</Text>
        </View>
      </View>
      <View>
        <Text style={styles.listHeader}>Challenges</Text>
        <FlatList
          numColumns={1}
          data={challenges}
          renderItem={renderItem}
          style={styles.challengeList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    padding: 20,
  },
  subHead: {},
  groupName: {
    color: "#FFF",
    fontSize: 32,
    marginBottom: 10,
  },
  description: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
  members: {
    color: "grey",
  },
  listHeader: {
    padding: 20,
    fontSize: 20,
  },
  challengeList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  challengeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.65,
    elevation: 1,
  },
  challengeTitle: {
    fontSize: 20,
    textAlign: "left",
  },

  challengeNum: {
    fontSize: 24,
    color: "grey",
  },
  submit: {
    color: "red",
    backgroundColor: "pink",
    padding: 5,
  },
});

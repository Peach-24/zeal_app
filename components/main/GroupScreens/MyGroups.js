import * as firebase from "firebase";
require("firebase/firestore");
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, FlatList } from "react-native";
import { fetchGroups } from "../../../redux/actions";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function MyGroups({ navigation }) {
  const [groups, setGroups] = useState([
    { name: "test", description: "test description" },
    { name: "test", description: "test description" },
    { name: "test", description: "test description" },
  ]);

  //   useEffect(() => {
  // firebase
  //   .firestore()
  //   .collection("users")
  //   .doc(firebase.auth().currentUser.uid)
  //   .collection("groupsJoined")
  //   .then((snapshot) => {
  //     let groups = snapshot.docs.map((doc) => {
  //       const data = doc.data();
  //       const id = doc.id;
  //       return { id, ...data };
  //     });
  //     setGroups(groups);
  //   });
  //   }, []);

  const renderItem = ({ item }) => (
    <View style={styles.groupCard}>
      <Text
        style={styles.groupTitle}
        onPress={() => navigation.navigate("SingleGroup", { item })}
      >
        {item.name}
      </Text>
      <View style={styles.groupBody}>
        <Text>{item.description}</Text>
        <Text>Frequency: {item.frequency}</Text>
      </View>
    </View>
  );

  //   const searchFilter = (text) => {
  //     setSearch(text);
  //     const newData = groups.filter((item) => {
  //       const itemName = item.name.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemName.indexOf(textData) > -1;
  //     });
  //     setFiltered(newData);
  //   };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Groups</Text>
        <Text style={{ color: "red" }}>
          Awaiting merge of James' joinGroup branch
        </Text>
      </View>
      <FlatList
        numColumns={1}
        data={groups}
        renderItem={renderItem}
        style={styles.groupsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

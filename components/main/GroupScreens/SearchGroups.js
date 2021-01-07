import * as firebase from "firebase";
require("firebase/firestore");
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, FlatList } from "react-native";
import { fetchGroups } from "../../../redux/actions";
import { SearchBar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function SearchGroups() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) => {
        let groups = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setGroups(groups);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.groupCard}>
      <Text style={styles.groupTitle}>{item.name}</Text>
      <View style={styles.groupBody}>
        <Text>{item.description}</Text>
        <Text>Frequency: {item.frequency}</Text>
      </View>
    </View>
  );

  const updateSearch = (criteria) => {
    setSearch(criteria);
  };

  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />

      <FlatList
        numColumns={1}
        data={groups}
        renderItem={renderItem}
        style={styles.groupsList}
      />

      {/*
        SCROLLVIEW OPTION*/}

      {/* <ScrollView>
        {groups.map((item) => {
          return (
            <View key={item.name} style={styles.groupCard}>
              <Text style={styles.groupTitle}>{item.name}</Text>
              <View style={styles.groupBody}>
                <Text>{item.description}</Text>
                <Text>Frequency: {item.frequency}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
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

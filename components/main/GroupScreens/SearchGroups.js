import * as firebase from "firebase";
require("firebase/firestore");
import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, FlatList } from "react-native";
import { fetchGroups } from "../../../redux/actions";

export default function SearchGroups() {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) => {
        let groups = snapshot.docs.map((doc) => {
          console.log(doc);
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setGroups(groups);
      });
  }, []);
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View>
      <FlatList numColumns={1} data={groups} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({});

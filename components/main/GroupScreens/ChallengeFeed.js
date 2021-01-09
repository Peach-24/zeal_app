import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { Text } from "react-native";
import { render } from "react-dom";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

require("firebase/firestore");

export default function ChallengeFeed({ navigation }) {
  const [submissions, setSubmissions] = useState([]);
  //refactor to access specific paths
  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc("0.hcwlt9l4kf")
      .collection("challenges")
      .doc("1")
      .collection("uploads")
      .get()
      .then((snapshot) => {
        let submissions = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setSubmissions(submissions);
      });
  }, []);

  renderItem = ({ item }) => (
    <View style={styles.imageCard}>
      <Image
        style={styles.image}
        source={{
          uri: item.downloadURL,
        }}
      />
      <View style={styles.imageCardInfo}>
        <Text style={styles.caption}>{item.caption}</Text>
        <MaterialCommunityIcons name="favorite" />
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={submissions}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageCard: {
    flex: 1,
    marginBottom: 15,
  },
  image: {
    height: 300,
    width: "auto",
  },
  caption: {
    padding: 5,
    fontSize: 16,
  },
  imageCardInfo: {},
});

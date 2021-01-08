import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { Text } from "react-native";
require("firebase/firestore");

export default function ChallengeFeed({ navigation }) {
  const [submissions, setSubmissions] = useState([]);
  //refactor to access specific paths
  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc("0.tnaw7g00i")
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
  console.log(submissions);
  // const renderItem = ({ item }) => {
  //   <View style={{ flex: 1 }}>
  //     <Text>{item.url}</Text>
  //     <Text>Challenge</Text>
  //     <Image
  //       style={{
  //         flex: 1,
  //         aspectRatio: 1 / 1,
  //       }}
  //       resizeMode="center"
  //       source={{ uri: item.url }}
  //     />
  //   </View>;
  // };

  return (
    // <View>
    //   <Image

    //     source={{
    //       uri:
    //         "https://firebasestorage.googleapis.com/v0/b/activity-club-3dfcf.appspot.com/o/Hedgehog.jpg?alt=media&token=c5534e2a-922d-4e39-95b0-89b566902853",
    //     }}
    //   />
    // </View>
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={submissions}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            {/* <Text>{item.url}</Text>
            <Text>Challenge</Text> */}
            <Image
              style={{
                width: "auto",
                height: 500,
              }}
              source={{
                uri: item.url,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, FlatList, Image } from "react-native";
import * as firebase from "firebase";
require("firebase/firestore");

export default function ChallengeFeed({ navigation }) {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("submissions")
      .doc("3BSsarzldBgVkMXa4UkbpDWKkzx1")
      .collection("userPosts")
      .doc("kjfa19gPACsKWSQ67zTv")
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
      });
  });

  const renderItem = ({ item }) => {
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
        }}
      />
    </View>;
  };
  return (
    <View>
      <FlatList numColumns={1} data={submissions} renderItem={renderItem} />
    </View>
  );
}

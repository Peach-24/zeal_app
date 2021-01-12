import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import * as firebase from "firebase";
import { Text, Button, SafeAreaView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

require("firebase/firestore");

export default function ChallengeFeed(props) {
  const [submissions, setSubmissions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const groupInfo = props.route.params.groupDetails;
  const challengeInfo = props.route.params.challengeInfo;

  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupInfo.id)
      .collection("challenges")
      .doc(challengeInfo.id)
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

  const handleFavourite = (item) => {
    if (!hasVoted) {
      console.log(`Voted for ${item.caption}`);
      setHasVoted(true);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageCard}>
      <Image
        style={styles.image}
        source={{
          uri: item.downloadURL,
        }}
      />
      <View style={styles.imageCardInfo}>
        <View>
          <Text style={styles.caption}>{item.caption || "No caption"}</Text>
          <Text style={styles.author}>
            {item.author || "Anonymous uploader"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleFavourite(item);
          }}>
          {!hasVoted && <Text style={styles.heart}>♥️</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{groupInfo.name}</Text>
        <Text style={styles.topic}>{challengeInfo.topic} submissions</Text>
        {!hasVoted ? (
          <Text style={styles.voteReminder}>
            Remember to ♥️ your favourite!
          </Text>
        ) : (
          <Text style={styles.voteMessage}>
            You've voted for your favourite.
          </Text>
        )}
      </View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={submissions}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 100 },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 30,
  },
  topic: { fontSize: 25, color: "grey" },
  voteReminder: { fontSize: 16, marginTop: 10, color: "red" },
  voteMessage: { fontSize: 16, marginTop: 10, color: "black" },
  imageCard: {
    flex: 1,
    marginBottom: 15,
  },
  image: {
    height: 300,
    width: "auto",
  },
  caption: {
    fontSize: 18,
  },
  author: {
    fontSize: 18,
    fontWeight: "700",
    paddingTop: 5,
  },
  heart: { padding: 10, fontSize: 28, backgroundColor: "pink" },
  imageCardInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#e8e8e8",
  },
});

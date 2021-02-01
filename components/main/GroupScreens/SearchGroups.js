import * as firebase from "firebase";
require("firebase/firestore");
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import formatDistance from "date-fns/formatDistance";
import Loading from "../Loading";

const backgroundImage = require("../../../assets/image1.jpeg");
const { width, height } = Dimensions.get("window");

export default function SearchGroups({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setFiltered(groups);
        setIsLoading(false);
      });
  }, []);

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
        <Text>
          Start date:{" "}
          {formatDistance(item.startDate.toDate(), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </View>
    </View>
  );

  const searchFilter = (text) => {
    setSearch(text);
    const newData = groups.filter((item) => {
      const itemName = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemName.indexOf(textData) > -1;
    });
    setFiltered(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.searchWrapper} />
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => searchFilter(text)}
            value={search}
            style={styles.searchBar}
          />
          <FlatList
            numColumns={1}
            data={filtered}
            renderItem={renderItem}
            style={styles.groupsList}
          />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
    height: height * 0.9,
    width: width,
    backgroundColor: "black",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
  searchWrapper: {
    marginTop: 0,
  },
  searchBar: { padding: 5 },
  groupsList: {
    padding: 10,
    backgroundColor: "lightgrey",
  },
  groupTitle: {
    fontSize: 24,
  },
  groupBody: {
    paddingTop: 10,
  },
});

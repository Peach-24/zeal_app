import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
} from "react-native";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function ChallengeScroll({ data }) {
  //const groupsJoined = useSelector(selectGroupsJoined);
  console.log(data);
  const renderItem = ({ item }) => (
    <View style={styles.groupCard}>
      <Text>{item.setTitle}</Text>
      {item.challenges.map((challenge) => {
        return <Text>{challenge.topic}</Text>;
      })}
    </View>
  );

  return (
    <ScrollView scrollEventThrottle={16}>
      <View>
        <Text style={styles.headerText}>Choose a challenge set</Text>
        <View style={styles.cardsWrapper}>
          <ScrollView>
            <View
              style={{
                height: 130,
                width: 130,
                marginLeft: 20,
                borderWidth: 0.5,
                borderColor: "grey",
              }}></View>
            <View style={{ flex: 2 }}>
              <Text>Header</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Body</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardsWrapper: {
    height: 130,
    marginTop: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
  },
});

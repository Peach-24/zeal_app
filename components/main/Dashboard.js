import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as firebase from "firebase";

import { useDispatch, useSelector } from "react-redux";
import { selectGroupsJoined } from "../main/redux/reducers/groupsSlice";
import Loading from "./Loading";

import { isAfter, isBefore } from "date-fns";

const Dashboard = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = firebase.auth().currentUser;
  const rightNow = new Date();
  const groupsJoined = useSelector(selectGroupsJoined);

  const groupIDs = groupsJoined.map((group) => group.id);
  const groups = groupsJoined.map((group) => group.name);
  console.log("GroupIDs", groupIDs, "LENGTH:", groupIDs.length);

  useEffect(() => {
    groupIDs.forEach((id) => {
      firebase
        .firestore()
        .collection("groups")
        .doc(id)
        .collection("challenges")
        .get()
        .then((snapshot) => {
          let challenges = snapshot.docs.map((task, index) => {
            const data = task.data();
            const id = task.id;
            const { dates } = data;
            const startDate = new Date(dates.startDate);
            const endDate = new Date(dates.endDate);
            const started = isAfter(new Date(), startDate);
            const ended = isAfter(new Date(), endDate);
            if (started && ended) {
              data.status = "closed";
            }
            if (started && !ended) {
              data.status = "current";
            }
            if (!started) {
              data.status = "hidden";
            }
            return { id, groups, ...data };
          });
          setChallenges(challenges);
          setIsLoading(false);
        });
    });
  }, []);

  console.log(groups);
  const renderItem = ({ item }) => (
    <>
      {item.status === "current" && (
        <View style={styles.groupCard}>
          <Text style={styles.groupTitle}>{item.topic}</Text>
          <Text style={styles.groupName}>in {item.groups}</Text>
        </View>
      )}
    </>
  );

  return (
    // <SafeAreaView>
    //   {!isLoading ? (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View>
        <Text style={styles.subhead}>Current Challenges</Text>
      </View>
      <FlatList
        numColumns={1}
        data={challenges}
        renderItem={renderItem}
        style={styles.groupsList}
      />
      <Button
        title="Search for a group"
        onPress={() =>
          navigation.navigate("Groups", { screen: "SearchGroups" })
        }
      />
      <Button
        title="Create a group"
        onPress={() => navigation.navigate("Groups", { screen: "CreateGroup" })}
      />
    </SafeAreaView>
    //   ) : (
    //     <SafeAreaView>
    //       <Loading />
    //     </SafeAreaView>
    //   )}
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
  },
  header: {
    backgroundColor: "black",
    padding: 30,
  },
  subhead: { fontSize: 20, padding: 20 },
  groupCard: {
    padding: 20,
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
  groupName: {
    fontSize: 17,
    color: "grey",
    fontStyle: "italic",
    paddingTop: 5,
  },
  searchBar: { padding: 5 },
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

export default Dashboard;

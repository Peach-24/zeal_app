import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";

import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../main/redux/reducers/userSlice";
import { selectGroupsJoined } from "../main/redux/reducers/groupsSlice";
import Loading from "./Loading";

import { isAfter, isBefore } from "date-fns";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = ({ navigation }) => {
  const currentUser = useSelector(selectUser);
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(currentUser);
  const groupsJoined = useSelector(selectGroupsJoined);

  const groupObjRef = groupsJoined.map((group) => {
    const newObj = {
      groupID: group.id,
      groupName: group.name,
    };
    return newObj;
  });

  const joinedGroupsRef = {};
  groupsJoined.forEach((group) => {
    joinedGroupsRef[group.groupId] = { ...group };
  });

  const getUserChallenges = async () => {
    const promises = groupObjRef.map((group) => {
      const { groupID, groupName } = group;
      return firebase
        .firestore()
        .collection("groups")
        .doc(groupID)
        .collection("challenges")
        .get()
        .then((snapshot) => {
          let tasks = snapshot.docs.map((task, index) => {
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
            return { id, groupName, groupID, ...data };
          });
          return tasks;
        });
    });
    const groups = await Promise.all(promises);
    const tasks = [];
    groups.forEach((group) => tasks.push(...group));
    await setChallenges(tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    setChallenges([]);
    setIsLoading(true);
    getUserChallenges();
  }, [user, groupsJoined]);

  const renderItem = ({ item }) => {
    const groupInfo = joinedGroupsRef[item.groupID];
    return (
      <>
        {item.status === "current" ? (
          <View style={styles.groupCard}>
            <Text
              style={styles.groupTitle}
              onPress={() =>
                //nested nav, go to the Groups tab navigator,
                //then down to the relevant singleGroup page
                navigation.navigate("Groups", {
                  screen: "SingleGroup",
                  params: { item: groupInfo },
                })
              }>
              {item.topic}{" "}
            </Text>
            <Text style={styles.groupName}>in {item.groupName}</Text>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <View style={{ backgroundColor: "black" }}>
      <SafeAreaView>
        {!isLoading ? (
          <SafeAreaView>
            <View style={styles.header}>
              <Text style={styles.title}>Dashboard </Text>
              <Text style={styles.visitMyGroups}>
                Got some snaps to upload?
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Groups", { screen: "MyGroups" })
                }>
                <Text style={styles.visitMyGroupsLink}>Visit My Groups</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.subhead}>Your current challenges...</Text>
            </View>
            <View style={styles.flatList}>
              <FlatList
                numColumns={1}
                data={challenges}
                renderItem={renderItem}
                style={styles.groupsList}
                keyExtractor={(item, index) => index.toString()}
              />
              <View styles={styles.buttonSection}>
                <View style={styles.buttonLeft}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Groups", {
                        screen: "SearchGroups",
                      })
                    }>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Discover groups</Text>
                      <MaterialCommunityIcons
                        name="magnify"
                        size={40}
                        color="white"
                        style={{ alignSelf: "center", paddingTop: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonRight}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Groups", { screen: "CreateGroup" })
                    }>
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Create a group</Text>
                      <MaterialCommunityIcons
                        name="account-group"
                        size={40}
                        color="white"
                        style={{ alignSelf: "center", paddingTop: 5 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView>
            <Loading />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "white",
    height: 380,
  },
  title: {
    fontSize: 35,
    color: "white",
    marginBottom: 20,
  },
  visitMyGroups: {
    fontSize: 20,
    fontStyle: "italic",
    color: "grey",
  },
  visitMyGroupsLink: {
    fontSize: 20,
    color: "lightblue",
    marginTop: 10,
    fontWeight: "700",
  },
  header: {
    backgroundColor: "black",
    padding: 30,
  },
  buttonLeft: {
    flex: 1,
    alignSelf: "flex-start",
    marginLeft: 60,
  },
  buttonRight: {
    flex: 1,
    alignSelf: "flex-end",
    marginRight: 60,
  },
  buttonSection: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#303030",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginTop: 20,
    width: 130,
    height: 130,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subhead: { fontSize: 20, padding: 20, backgroundColor: "#fff" },

  groupCard: {
    flex: 1,
    padding: 15,
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
  groupsList: {
    marginTop: -10,
    marginHorizontal: 10,
    // backgroundColor: "#fff",
  },
  groupTitle: {
    fontSize: 24,
  },
  groupBody: {
    paddingTop: 10,
    flex: 1,
  },
});

export default Dashboard;

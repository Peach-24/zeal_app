import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  joinGroup,
  leaveGroup,
  selectGroupsJoined,
} from "../redux/reducers/groupsSlice";
import * as firebase from "firebase";
require("firebase/firestore");
import formatDistance from "date-fns/formatDistance";
import { isAfter, isBefore } from "date-fns";

export default function SingleGroup(props, { navigation }) {
  const dispatch = useDispatch();
  const groupsJoined = useSelector(selectGroupsJoined);
  const groupsJoinedIds = groupsJoined.map((group) => group.groupId);
  const groupInfo = props.route.params.item;
  const { groupId } = groupInfo;
  const [challenges, setChallenges] = useState([]);
  const [membersCount, setMembersCount] = useState(0);
  const [joined, setJoined] = useState(groupsJoinedIds.includes(groupId));
  const [usersWhoHaveSubmitted, setUsersWhoHaveSubmitted] = useState({});

  const fetchUsersWhoHaveSubmitted = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUsersWhoHaveSubmitted(doc.data().alreadyUploaded);
        } else {
          console.log("Cannot retrieve group document");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  // UNCOMMENT TO SEE DATA FROM ABOVE FUNCTION  (line below)
  console.log(usersWhoHaveSubmitted);

  useEffect(() => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
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
          return { id, ...data };
        });
        setChallenges(challenges);
      });

    firebase
      .firestore()
      .collection("groups")
      .doc(groupInfo.groupId)
      .collection("members")
      .get()
      .then((snapshot) => setMembersCount(snapshot.docs.length));
  }, [joined]);
  const challengeButtonText = {
    closed: "Closed",
    current: "Submit",
    hidden: "",
  };
  const renderItem = ({ item }) => (
    <View style={styles.challengeCard}>
      <Text style={styles.challengeNum}>{item.challengeNum}</Text>
      <Text style={styles.challengeTitle}>{item.topic}</Text>
      <Text>
        {formatDistance(new Date(item.dates.startDate), new Date(), {
          addSuffix: true,
        })}
      </Text>
      {item.status === "hidden" ? null : (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("PhotoCapture", {
              item,
              groupDetails: groupInfo,
            })
          }
        >
          <Text style={styles[item.status]}>
            {challengeButtonText[item.status]}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleJoin = async () => {
    console.log("handleJoin");
    setJoined(true);
    await dispatch(joinGroup(groupInfo));
    console.log("added");
  };

  const handleLeave = async () => {
    console.log("handleLeave");
    setJoined(false);
    await dispatch(leaveGroup(groupInfo));
    console.log("removed");
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.groupName}>{groupInfo.name}</Text>
        <View style={styles.subHead}>
          <Text style={styles.description}>{groupInfo.description}</Text>
          <Text style={styles.members}>Members: {membersCount}</Text>
          <Text></Text>
        </View>
      </View>
      <View>
        {!joined ? (
          <Button title="Join Group" onPress={() => handleJoin()} />
        ) : (
          <Button title="Leave Group" onPress={() => handleLeave()} />
        )}

        <Text style={styles.listHeader}>Challenges</Text>
        <FlatList
          numColumns={1}
          data={challenges}
          renderItem={renderItem}
          style={styles.challengeList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
    padding: 20,
  },
  subHead: {},
  groupName: {
    color: "#FFF",
    fontSize: 32,
    marginBottom: 10,
  },
  description: {
    color: "#FFF",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 5,
  },
  members: {
    color: "grey",
  },
  listHeader: {
    padding: 20,
    fontSize: 20,
  },
  challengeList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  challengeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.65,
    elevation: 2,
  },
  challengeTitle: {
    fontSize: 20,
    textAlign: "left",
  },

  challengeNum: {
    fontSize: 24,
    color: "grey",
  },
  hidden: {
    color: "red",
    backgroundColor: "pink",
    padding: 5,
  },
  current: {
    color: "black",
    backgroundColor: "#adf09d",
    padding: 5,
  },
  closed: {
    color: "blue",
    padding: 5,
  },
});

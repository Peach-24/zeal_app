import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ImageBackground,
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

const backgroundImage = require("../../../assets/image1.jpeg");
import Loading from "../Loading";

export default function SingleGroup(props, { navigation }) {
  const dispatch = useDispatch();
  const groupsJoined = useSelector(selectGroupsJoined);
  const currentUser = firebase.auth().currentUser;
  const groupsJoinedIds = groupsJoined.map((group) => group.groupId);
  const groupInfo = props.route.params.item;
  const { groupId } = groupInfo;
  const [challenges, setChallenges] = useState([]);
  const [membersCount, setMembersCount] = useState(0);
  const [joined, setJoined] = useState(groupsJoinedIds.includes(groupId));
  const [usersWhoHaveSubmitted, setUsersWhoHaveSubmitted] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Gets information about the users who have submitted to each challenge
    fetchUsersWhoHaveSubmitted();
    // Gets the challenge information from firebase
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
    // gets the number of members from firebase
    firebase
      .firestore()
      .collection("groups")
      .doc(groupInfo.groupId)
      .collection("members")
      .get()
      .then((snapshot) => {
        setMembersCount(snapshot.docs.length);
        setTimeout(() => {
          setIsLoading(false);
        }, 780);
      });
  }, [joined]);

  const challengeButtonText = {
    closed: "Closed",
    current: "Submit",
    hidden: "",
  };

  const submitOrView = (challengeSubmitters, challengeName, currentUserId) => {
    // true >> View
    // false >> submit
    // This logic checks that the challengeSubmitters object exists before doing the includes check
    if (challengeSubmitters && challengeSubmitters[challengeName]) {
      return challengeSubmitters[challengeName].users.includes(currentUserId);
    } else {
      return false;
    }
  };

  const renderItem = ({ item, index }) => {
    // use hasSubmitted to make decisions on button render
    const hasSubmitted = submitOrView(
      usersWhoHaveSubmitted,
      item.name,
      currentUser.uid
    );
    const timeText =
      item.status === "closed"
        ? ``
        : item.status === "hidden"
        ? `opens ${formatDistance(new Date(item.dates.startDate), new Date(), {
            addSuffix: true,
          })}`
        : `closes ${formatDistance(new Date(item.dates.endDate), new Date(), {
            addSuffix: true,
          })}`;
    // if challenge is closed and the user did not submit, we want to block
    // them viewing the submissions
    const didNotSubmit = item.status === "closed" && !hasSubmitted;
    return (
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeNum}>{index + 1}</Text>
          <Text style={styles.challengeTitle}>{item.topic}</Text>
        </View>
        <View style={styles.challengeContent}>
          <Text style={styles.challengeTimeText}>{timeText}</Text>
          {item.status === "hidden" ? null : didNotSubmit ? (
            <Text>{joined ? "Did not submit" : "Closed"}</Text>
          ) : !joined ? null : (
            <TouchableOpacity
              style={styles.challengeButton}
              onPress={() => {
                return hasSubmitted
                  ? props.navigation.navigate("ChallengeFeed", {
                      groupDetails: groupInfo,
                      challengeInfo: item,
                    })
                  : props.navigation.navigate("PhotoCapture", {
                      item,
                      groupDetails: groupInfo,
                    });
              }}>
              <Text style={styles[hasSubmitted ? "view" : "submit"]}>
                {hasSubmitted ? "View" : "Submit"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

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
  isLoading;
  return (
    <ImageBackground source={backgroundImage} style={styles.image}>
      {isLoading ? (
        <Loading />
      ) : (
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
              <View style={styles.buttonSize}>
                <TouchableOpacity
                  onPress={() => handleJoin()}
                  style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Join Group</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonSize}>
                <TouchableOpacity
                  onPress={() => handleLeave()}
                  style={styles.buttonOnPress}>
                  <Text style={styles.buttonOnPressText}>Leave Group</Text>
                </TouchableOpacity>
              </View>
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
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonOnPress: {
    elevation: 8,
    borderWidth: 2,
    borderColor: "#303030",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  buttonOnPressText: {
    fontSize: 18,
    color: "#303030",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#303030",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonSize: {
    alignSelf: "center",
    justifyContent: "center",
    width: 300,
  },
  challengeButton: {
    paddingLeft: 10,
  },
  challengeCard: {
    flexDirection: "column",
    //justifyContent: "space-between",
    alignItems: "flex-start",
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
  challengeContent: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    paddingRight: 5,
    height: 30,
  },
  challengeHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  challengeList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  challengeNum: {
    fontSize: 24,
    paddingRight: 10,
    color: "grey",
  },
  challengeTimeText: {
    fontSize: 14,
  },
  challengeTitle: {
    fontSize: 24,
  },
  submit: {
    color: "black",
    backgroundColor: "#adf09d",
    padding: 5,
  },
  view: {
    color: "black",
    backgroundColor: "#adf09d",
    padding: 5,
  },
  header: {
    backgroundColor: "#000",
    padding: 20,
    paddingBottom: 5,
    marginBottom: 10,
  },
  subHead: {},
  groupName: {
    color: "#FFF",
    fontSize: 34,
    marginBottom: 8,
  },
  description: {
    color: "#FFF",
    fontSize: 24,
    fontStyle: "italic",
    marginBottom: 5,
  },
  members: {
    color: "grey",
    fontSize: 16,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 26,
  },
  closed: {
    color: "blue",
    padding: 5,
  },
});

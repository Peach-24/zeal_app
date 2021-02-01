import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  ImageBackground,
  Dimensions,
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
import Loading from "../Loading";

const backgroundImage = require("../../../assets/image1.jpeg");
const { width, height } = Dimensions.get("window");

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
    setIsLoading(true);
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
        }, 400);
      });
    // have use effect run on a change to groups joined
    // or a change on incoming info
  }, [joined, groupInfo]);

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
              }}
            >
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
    <ImageBackground source={backgroundImage} style={styles.background}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.outerContainer}>
          <View style={styles.header}>
            <Text style={styles.groupName}>{groupInfo.name}</Text>
            <View>
              <Text style={styles.description}>{groupInfo.description}</Text>
              <Text style={styles.members}>Members: {membersCount}</Text>
            </View>
          </View>
          <View>
            {!joined ? (
              <View style={styles.buttonSize}>
                <TouchableOpacity
                  onPress={() => handleJoin()}
                  style={styles.buttonContainer}
                >
                  <Text style={styles.buttonText}>Join Group</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonSize}>
                <TouchableOpacity
                  onPress={() => handleLeave()}
                  style={styles.buttonOnPress}
                >
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
  outerContainer: {
    marginTop: 20,
    maxHeight: height * 0.8,
  },
  background: {
    flex: 0,
    height: height,
    width: width,
  },
  buttonOnPressText: {
    fontSize: 16,
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
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonSize: {
    alignSelf: "center",
    justifyContent: "center",
    width: width * 0.4,
  },
  challengeButton: {
    paddingLeft: 10,
  },
  challengeCard: {
    flexDirection: "column",
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
    paddingHorizontal: 10,
    maxHeight: height * 0.55,
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
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  groupName: {
    color: "black",
    fontSize: 34,
    marginBottom: 8,
  },
  description: {
    color: "black",
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 5,
  },
  members: {
    color: "grey",
    fontSize: 18,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
  },
  closed: {
    color: "blue",
    padding: 5,
  },
});

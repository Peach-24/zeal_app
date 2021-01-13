import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import { challengeSet, challengeSets } from "../../testData/Data";
import { useDispatch, useSelector } from "react-redux";
import {
  joinGroup,
  fetchGroupsJoined,
  selectGroupsJoined,
} from "../redux/reducers/groupsSlice";
import * as firebase from "firebase";
require("firebase/firestore");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import ModalDatePicker from "../Utils/ModalDatePicker";
import ChallengeScroll from "../ChallengeScreens/ChallengeScroll";
const { setChallengeDates } = require("../Utils/challengesDates");

export default function CreateGroup({ navigation }) {
  const dispatch = useDispatch();
  const defaultDate = new Date();
  defaultDate.setHours(0, 0, 0, 0);

  const [groupName, setGroupName] = useState("");
  const [groupError, setGroupError] = useState(null);
  const [desc, setDesc] = useState("");
  const [descError, setDescError] = useState(null);
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(defaultDate);
  const [isCreated, setCreated] = useState(false);
  const [chosenChallengeSet, setChosenChallengeSet] = useState([]);
  const [groupsJoined, setGroupsJoined] = useSelector(selectGroupsJoined);

  const createGroup = async (groupName, desc, frequency) => {
    const groupId = Math.random().toString(36);
    const groupData = {
      groupId,
      name: groupName,
      description: desc,
      frequency,
      startDate,
      id: groupId,
    };
    const db = firebase.firestore();
    const batch = db.batch();
    const groupRef = db.collection("groups").doc(groupId);
    batch.set(groupRef, groupData);
    chosenChallengeSet.challenges.forEach((challenge, index) => {
      const dates = setChallengeDates(
        index,
        groupData.startDate,
        groupData.frequency
      );
      challenge.dates = dates;
      const challengeRef = db
        .collection("groups")
        .doc(groupId)
        .collection("challenges")
        .doc(challenge.name.slice(-1));
      batch.set(challengeRef, challenge);
    });

    await batch.commit().then(async () => {
      setCreated(true);
      // add the group creator to the group
      await dispatch(joinGroup(groupData));
      // once joined, update redux with the new group
      await dispatch(fetchGroupsJoined());
      // ***need to reset fields back to defaults
      setGroupName("");
      setFrequency("Daily");
      setStartDate(defaultDate);
      setDesc("");
      // can use timeout to reset the screen after certain amount of time
      setTimeout(() => {
        setCreated(false);
        // navigate to the my groups screen
        navigation.navigate("MyGroups");
      }, 2000);
    });
  };

  const handleDateChange = (newDate) => {
    setStartDate(newDate);
  };

  const handleChosenChallengesChange = (newChallengeSet) => {
    setChosenChallengeSet(newChallengeSet);
  };

  !isCreated;
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Create a group...</Text>
      </View>
      {isCreated ? (
        <View style={styles.createdContainer}>
          <MaterialCommunityIcons
            name={"check-circle-outline"}
            style={styles.createdIcon}
          />
          <Text style={styles.createdText}>Group Created!</Text>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.inputsContainer}>
              <Text style={styles.label}>What will you call your group?</Text>
              <TextInput
                style={styles.input}
                defaultValue={groupName}
                placeholder="Group name"
                maxLength={20}
                require
                onChangeText={(groupName) => setGroupName(groupName)}
              />
              {!!groupError && <Text style={styles.error}>{groupError}</Text>}
              <Text style={styles.label}>A brief description</Text>
              <TextInput
                style={styles.input}
                placeholder="What's it about?"
                defaultValue={desc}
                onChangeText={(desc) => setDesc(desc)}
              />
              {!!descError && <Text style={styles.error}>{descError}</Text>}

              <Text style={styles.label}>
                How often do you want your challenges?
              </Text>
              <View style={styles.radioContainer}>
                <RadioButton
                  value="Daily"
                  status={frequency === "Daily" ? "checked" : "unchecked"}
                  onPress={() => setFrequency("Daily")}
                />
                <Text>Daily</Text>
                <RadioButton
                  value="Weekly"
                  status={frequency === "Weekly" ? "checked" : "unchecked"}
                  onPress={() => setFrequency("Weekly")}
                />
                <Text>Weekly</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Start Date:</Text>
                <ModalDatePicker handleDateChange={handleDateChange} />
              </View>
              <Text style={styles.label}>Select a challenge set:</Text>
            </View>
            <ChallengeScroll
              data={challengeSets}
              handleChosenChallengesChange={handleChosenChallengesChange}
            />
            <View style={styles.buttonSize}>
              <TouchableOpacity
                onPress={() => {
                  if (groupName === "") {
                    setGroupError("(group name required)");
                  }
                  if (desc === "") {
                    setDescError("(description required)");
                  } else {
                    createGroup(groupName, desc, frequency);
                  }
                }}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Create Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
  createdIcon: {
    fontSize: 140,
    color: "green",
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#000",
    padding: 20,
    paddingBottom: 10,
  },
  heading: {
    color: "#FFF",
    fontSize: 32,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    paddingRight: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
  inputsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  radioContainer: {
    flex: 1,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "white",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 2,
  },
  createdContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: height / 7,
  },
  createdText: {
    color: "green",
    fontSize: 30,
  },
  error: {
    color: "red",
  },
});

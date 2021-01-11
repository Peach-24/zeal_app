import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { challengeSet, challengeSets } from "../../testData/Data";
import * as firebase from "firebase";
require("firebase/firestore");

import DateSelect from "../Utils/DateTimePicker";
import ChallengeScroll from "../ChallengeScreens/ChallengeScroll";

// import UUIDGenerator from "react-native-uuid-generator";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [desc, setDesc] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [isCreated, setCreated] = useState(false);

  const createGroup = async (groupName, desc, frequency) => {
    const groupId = Math.random().toString(36);
    const groupData = {
      groupId,
      name: groupName,
      description: desc,
      frequency,
      startDate,
    };

    const db = firebase.firestore();
    const batch = db.batch();
    const groupRef = db.collection("groups").doc(groupId);
    batch.set(groupRef, groupData);

    challengeSet.forEach((challenge, index) => {
      const formatChallenge = setChallengeStartDate(
        challenge,
        index,
        groupData.startDate,
        groupData.frequency
      );
      const challengeRef = db
        .collection("groups")
        .doc(groupId)
        .collection("challenges")
        .doc(challenge.challengeNum.toString());
      batch.set(challengeRef, challenge);
    });

    await batch.commit().then(() => {
      setCreated(true);
    });
  };

  //look into this at some point!
  // UUIDGenerator.getRandomUUID().then((uuid) => {
  //   console.log(uuid);
  // });
  const handleDateChange = (newDate) => {
    setStartDate(newDate);
  };
  !isCreated;
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Create a group...</Text>
      </View>
      {isCreated ? (
        <View>
          <Text style={{ color: "green" }}>Group Created!</Text>
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
                onChangeText={(groupName) =>
                  setGroupName(groupName)
                }></TextInput>
              <Text style={styles.label}>A brief description</Text>
              <TextInput
                style={styles.input}
                placeholder="What's it about?"
                defaultValue={desc}
                onChangeText={(desc) => setDesc(desc)}></TextInput>
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
              <Text style={styles.label}>Start Date:</Text>
              <DateSelect handleDateChange={handleDateChange} />
            </View>
            <ChallengeScroll data={challengeSets} />
            <Button
              title="Create Group"
              onPress={() => createGroup(groupName, desc, frequency)}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
  inputsContainer: {
    flex: 1,
    paddingHorizontal: 20,
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
});

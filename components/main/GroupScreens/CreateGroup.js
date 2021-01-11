import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { challengeSet } from "../../testData/Data";
import * as firebase from "firebase";
require("firebase/firestore");

import DateSelect from "../Utils/DateTimePicker";

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
    <View>
      {isCreated ? (
        <View>
          <Text style={{ color: "green" }}>Group Created!</Text>
        </View>
      ) : (
        <View>
          <Text>Create a group for your pals</Text>
          <View>
            <Text>What will you call your group?</Text>
            <TextInput
              defaultValue={groupName}
              placeholder="Group name"
              onChangeText={(groupName) => setGroupName(groupName)}
            ></TextInput>
            <Text>A brief description</Text>
            <TextInput
              placeholder="What's it about?"
              defaultValue={desc}
              onChangeText={(desc) => setDesc(desc)}
            ></TextInput>
            <Text>How often do you want your challenges?</Text>
            <Text>
              <RadioButton
                value="Daily"
                status={frequency === "Daily" ? "checked" : "unchecked"}
                onPress={() => setFrequency("Daily")}
              />
              Daily
            </Text>
            <Text>
              <RadioButton
                value="Weekly"
                status={frequency === "Weekly" ? "checked" : "unchecked"}
                onPress={() => setFrequency("Weekly")}
              />{" "}
              Weekly
            </Text>
            <Text>Start Date:</Text>
            <DateSelect handleDateChange={handleDateChange} />
            <Button
              title="Create Group"
              onPress={() => createGroup(groupName, desc, frequency)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { RadioButton } from "react-native-paper";
import { challengeSet } from "../../testData/Data";
import * as firebase from "firebase";
require("firebase/firestore");

import DateSelect from "../Utils/DateTimePicker";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [desc, setDesc] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(new Date());
  const [isCreated, setCreated] = useState(false);

  const createGroup = async (groupName, desc, frequency) => {
    const groupData = {
      name: groupName,
      description: desc,
      frequency,
      startDate,
    };
    const db = firebase.firestore();
    const batch = db.batch();

    const groupRef = db.collection("groups").doc(groupName);
    batch.set(groupRef, groupData);

    challengeSet.forEach((challenge) => {
      const challengeRef = db
        .collection("groups")
        .doc(groupName)
        .collection("submissions")
        .doc(challenge.challengeNum.toString());
      batch.set(challengeRef, challenge);
    });

    await batch.commit().then(() => {
      setCreated(true);
    });
  };

  const handleDateChange = (newDate) => {
    setStartDate(newDate);
    console.log("newdate>>", newDate);
    console.log("startDate>>", startDate);
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
              onChangeText={(groupName) => setGroupName(groupName)}></TextInput>
            <Text>A brief description</Text>
            <TextInput
              placeholder="What's it about?"
              defaultValue={desc}
              onChangeText={(desc) => setDesc(desc)}></TextInput>
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

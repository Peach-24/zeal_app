import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
import { challengeSet } from "../../testData/Data";
import * as firebase from "firebase";
require("firebase/firestore");
import { RadioButton } from "react-native-paper";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [desc, setDesc] = useState("");
  const [frequency, setFrequency] = useState("Daily");

  const createGroup = (groupName, desc, frequency) => {
    const groupData = { name: groupName, description: desc, frequency };
    firebase
      .firestore()
      .collection("groups")
      .doc(groupName)
      .set(groupData)
      .then(() => {
        console.log("it worked!");
      })
      .catch(() => {
        console.error("it failed!");
      });
  };

  return (
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
        <Button
          title="Create Group"
          onPress={() => createGroup(groupName, desc, frequency)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

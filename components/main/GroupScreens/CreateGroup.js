import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function CreateGroup() {
  return (
    <View>
      <TextInput placeholder="Create a group for your pals" />
      <View>
        <Text>What will you call your group?</Text>
        <TextInput placeholder="Group name"></TextInput>
        <Text>A brief description</Text>
        <TextInput placeholder="What's it about?"></TextInput>
        <Text>How often do you want your challenges?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

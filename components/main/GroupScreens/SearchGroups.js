import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function SearchGroups() {
  return (
    <View>
      <TextInput placeholder="Search for a group" />
      <View>
        <Text>GROUP 1</Text>
        <Text>GROUP 2</Text>
        <Text>GROUP 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

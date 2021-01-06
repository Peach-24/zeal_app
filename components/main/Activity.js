import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Activity = () => {
  return (
    <View style={styles.container}>
      <Text>Activity</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Activity;

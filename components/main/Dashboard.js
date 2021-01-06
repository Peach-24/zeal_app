import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Dashboard;

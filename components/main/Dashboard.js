import React from "react";
import { Text, View, Button, StyleSheet, Alert } from "react-native";

const Dashboard = ({ navigation }) => {
  const currentChallengeAlert = () =>
    Alert.alert(
      "Hello James/Matt",
      "Want to submit a photo? \n\n Go to: singleGroup > Challenge submit > PhotoCapture > Submit! \n\n Enjoy! ",
      [
        {
          text: "WTF ??!!",
          style: "cancel",
        },
        { text: "Understood!" },
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button
        title="Search for a group"
        onPress={() =>
          navigation.navigate("Groups", { screen: "SearchGroups" })
        }
      />
      <Button
        title="Create a group"
        onPress={() => navigation.navigate("Groups", { screen: "CreateGroup" })}
      />
      <Button title="Current Challenge" onPress={currentChallengeAlert} />
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

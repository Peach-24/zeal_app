import React from "react";
import { Text, View, Button, StyleSheet, Alert, Image } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
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
      <Image
        source={require("../../assets/Zeal Logo - No text.svg")}
        style={{ width: 200, height: "auto" }}
      />
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

import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

const GroupStack = createStackNavigator();

function GroupsList({ navigation }) {
  return (
    <View>
      <Text>GroupList screen</Text>
      <Button title="group 1" onPress={() => navigation.navigate("Group")} />
      <Button title="group 2" onPress={() => navigation.navigate("Group")} />
    </View>
  );
}

function Group({ navigation }) {
  return (
    <View>
      <Text>Group - GroupName</Text>
      <Button
        title="Challenge 1"
        onPress={() => navigation.navigate("Challenge")}
      />
    </View>
  );
}

function Challenge({ navigation }) {
  return (
    <View>
      <Text>Challenge Screen</Text>
    </View>
  );
}

const Groups = (props) => {
  const { navigation } = props;
  return (
    <GroupStack.Navigator>
      <GroupStack.Screen name="GroupsList" component={GroupsList} />
      <GroupStack.Screen name="Group" component={Group} />
      <GroupStack.Screen name="Challenge" component={Challenge} />
    </GroupStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Groups;

{
  /* <View style={styles.container}>
      <Text>Groups</Text>
      <Button/>
      <Button title="Camera" onPress={() => navigation.navigate("Camera")} />
    </View> */
}

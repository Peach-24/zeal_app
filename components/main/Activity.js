import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUser } from "./redux/reducers/userSlice";
import { selectGroupsJoined } from "./redux/reducers/groupsSlice";
import store from "../main/redux/store";

const Activity = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const groupsJoined = useSelector(selectGroupsJoined);

  const handlePress = async () => {
    console.log("store before dispatch", store.getState());
  };

  return (
    <View style={styles.container}>
      <Text>Activity</Text>

      <Button title="button" onPress={() => handlePress()}>
        Click for users
      </Button>
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

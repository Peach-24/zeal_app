import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUser } from "./redux/reducers/userSlice";
import { selectGroupsJoined } from "./redux/reducers/groupsSlice";
import store from "../main/redux/store";
import { SafeAreaView } from "react-native-safe-area-context";

const Activity = () => {
  const getStarted = "hello new user, get started";
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const groupsJoined = useSelector(selectGroupsJoined);
  const [gettingStarted, removeGettingStarted] = useState(getStarted);

  const handlePress = async () => {
    console.log(fontFamily, "store before dispatch", store.getState());
  };
  return (
    <SafeAreaView>
      <View>
        {!!gettingStarted && (
          <Text>
            {gettingStarted}{" "}
            <Button
              title="got it!"
              onPress={() => removeGettingStarted(null)}
            />
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    paddingTop: 620,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  svgContainer: {},
});
export default Activity;

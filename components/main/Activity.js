import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, selectUser } from "./redux/reducers/userSlice";
import store from "../main/redux/store";

const Activity = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const posts = useSelector((state) => state.posts);

  const handlePress = async () => {
    console.log("store before dispatch", store.getState());
    //await dispatch(fetchUser());
    //console.log("user", user);
  };

  const renderedPosts = posts.map((post) => {
    return (
      <View key={post.id}>
        <Text>{post.title}</Text>
        <Text>{post.content}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text>Activity</Text>
      <View>{renderedPosts}</View>
      <Button title="but" onPress={() => handlePress()}>
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

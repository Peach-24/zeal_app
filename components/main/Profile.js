import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { signOut } from "../main/redux/reducers/userSlice";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Profile;

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View, Button } from "react-native";

const Landing = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate;
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate;
        }}
      />
    </View>
  );
};

export default Landing;

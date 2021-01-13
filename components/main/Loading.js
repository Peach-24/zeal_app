import { StyleSheet, Text, View, Animated, Image } from "react-native";
import React, { useState } from "react";
import LoadingAnimation from "react-native-bouncing-preloaders";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LoadingAnimation
        icons={[require("../../assets/zebra-face_1f993.png")]}
        leftRotation="-680deg"
        rightRotation="360deg"
        leftDistance={-180}
        rightDistance={-250}
        leftDistance={-180}
        rightDistance={-250}
        speed={1000}
      />
      <Text style={{ fontSize: 30 }}>Loading...</Text>
    </View>
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
});
export default Loading;

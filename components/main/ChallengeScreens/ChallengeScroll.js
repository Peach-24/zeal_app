import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { challengeSet, challengeSets } from "../../testData/Data";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => {
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>;
};

export default function ChallengeScroll({ data }) {
  const [challSets, setChallSets] = useState([
    { key: "left-spacer", id: "left-spacer" },
    ...challengeSets,
    { key: "right-spacer", id: "right-spacer" },
  ]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [3, -10, 3],
      extrapolate: "clamp",
    });
    if (!item.setTitle) {
      return <View style={{ width: SPACER_ITEM_SIZE }}></View>;
    }
    return (
      <View style={{ width: ITEM_SIZE, paddingTop: 20, paddingBottom: 20 }}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 34,
            transform: [{ translateY }],
          }}>
          <Text style={styles.cardTitle}>{item.setTitle}</Text>
          {item.challenges.map((challenge) => {
            return (
              <Text key={challenge.challengeNum.toString()}>
                {challenge.topic}
              </Text>
            );
          })}
        </Animated.View>
      </View>
    );
  };

  if (challSets.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={challSets}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={renderItem}
        snapToInterval={ITEM_SIZE}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        snapToAlignment="start"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
  },
  // container: {
  //   flex: 1,
  // },
  // cardsWrapper: {
  //   height: 130,
  //   marginTop: 20,
  // },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
  },
});

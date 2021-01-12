// import React from "react";
// import { Text, View, Button, StyleSheet } from "react-native";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchUser, selectUser } from "./redux/reducers/userSlice";
// import { selectGroupsJoined } from "./redux/reducers/groupsSlice";
// import store from "../main/redux/store";

// const Activity = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const groupsJoined = useSelector(selectGroupsJoined);

//   const handlePress = async () => {
//     console.log(fontFamily, "store before dispatch", store.getState());
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Activity</Text>

//       <Button title="button" onPress={() => handlePress()}>
//         Click for users
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });

// export default Activity;

import { StyleSheet, Text, View, Animated, Image } from "react-native";
import React, { useState } from "react";
import LoadingAnimation from "react-native-bouncing-preloaders";

//gif image loading screen

// const Loading = () => {
//   const [loadStatus, setLoadingStatus] = useState();
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.centered}>
//         <Text style={styles.textSize}>Loading...</Text>
//         <Image
//           source={require("../../assets/15.gif")}
//           style={[{ width: 1000 }]}
//           resizeMode="contain"
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   textSize: {
//     fontSize: 30,
//   },
// });
// export default Loading;

//Single bouncing zebra emoji - run this: npm install --save react-native-bouncing-preloaders

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
        speed={1400}
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

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import * as firebase from "firebase";

const initialState = { joinedGroups: [] };

export const fetchGroupsJoined = createAsyncThunk(
  "groups/fetchGroupsJoined",
  async () => {
    const response = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("groupsJoined")
      .get();
    const joined = response.docs.map((doc) => {
      const data = doc.data();
      const timestamp = data.groupInfo.startDate.toDate().toISOString();
      const groupInfo = { ...data.groupInfo, startDate: timestamp };
      const id = doc.id;
      return { id, ...groupInfo };
    });
    return joined;
  }
);

// const db = firebase.firestore();
//     const batch = db.batch();
//     const groupRef = db.collection("groups").doc(groupId);
//     batch.set(groupRef, groupData);

//     challengeSet.forEach((challenge) => {
//       const challengeRef = db
//         .collection("groups")
//         .doc(groupId)
//         .collection("challenges")
//         .doc(challenge.challengeNum.toString());
//       batch.set(challengeRef, challenge);
//     });

//     await batch.commit().then(() => {
//       setCreated(true);
//     });

export const joinGroup = createAsyncThunk(
  "groups/fetchGroupsJoined",
  async (groupInfo) => {
    console.log(groupInfo);
    const user = firebase.auth().currentUser.uid;
    const { groupId } = groupInfo;
    const batch = db.batch();
    const groupRef = db
      .collection("groups")
      .doc(groupId)
      .collection("members")
      .doc(user);
    batch.set(groupRef, { user });
    const groupsJoinedRef = db
      .collection("users")
      .doc(user)
      .collection(groupsJoined)
      .doc(groupId);
    batch.set(groupsJoinedRef, groupInfo);

    const response = await batch.commit();
    console.log(response.data());
    return response.data();
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGroupsJoined.fulfilled]: (state, action) => {
      return action.payload;
    },
    [joinGroup.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default groupsSlice.reducer;

export const selectGroupsJoined = (state) => state.groups.groupsJoined;

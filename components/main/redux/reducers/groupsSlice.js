import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import * as firebase from "firebase";
import { ThemeContext } from "react-native-elements";

const initialState = [];

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

export const joinGroup = createAsyncThunk(
  "groups/joinGroup",
  async (groupInfo) => {
    const user = firebase.auth().currentUser.uid;
    const { groupId } = groupInfo;
    const db = firebase.firestore();
    const batch = db.batch();
    try {
      // add member to the group
      const groupRef = db
        .collection("groups")
        .doc(groupId)
        .collection("members")
        .doc(user);
      batch.set(groupRef, { user });
      // add groups to the user
      const groupsJoinedRef = db
        .collection("users")
        .doc(user)
        .collection("groupsJoined")
        .doc(groupId);
      batch.set(groupsJoinedRef, { groupInfo });
      // send the batch command
      await batch.commit().then(() => {
        console.log("batch commit completed successfully");
      });
      const timestamp = groupInfo.startDate.toDate().toISOString();
      const formattedGroupInfo = { ...groupInfo, startDate: timestamp };
      console.log({ ...formattedGroupInfo });
      return { ...formattedGroupInfo };
    } catch (e) {
      console.log("batch join failed");
    }
  }
);

export const leaveGroup = createAsyncThunk(
  "groups/leaveGroup",
  async (groupInfo) => {
    const user = firebase.auth().currentUser.uid;
    const { groupId } = groupInfo;
    const db = firebase.firestore();
    const batch = db.batch();
    try {
      // remove member from the group
      const groupRef = db
        .collection("groups")
        .doc(groupId)
        .collection("members")
        .doc(user);
      batch.delete(groupRef);
      // remove groups from the user
      const groupsJoinedRef = db
        .collection("users")
        .doc(user)
        .collection("groupsJoined")
        .doc(groupId);
      batch.delete(groupsJoinedRef);
      // send the batch command
      await batch.commit().then(() => {
        console.log("batch delete completed successfully");
      });
      return groupId;
    } catch (e) {
      console.log("batch join failed");
    }
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
      // need to make sure this isn't overwriting everything
      const newGroups = state.concat(action.payload);
      return newGroups;
    },
    [leaveGroup.fulfilled]: (state, action) => {
      // need to remove the deleted group
      const updatedGroups = state.filter((group) => {
        return group.groupId !== action.payload;
      });
      return updatedGroups;
    },
  },
});

export default groupsSlice.reducer;

export const selectGroupsJoined = (state) =>
  state.groups.filter((group) => Boolean(group));

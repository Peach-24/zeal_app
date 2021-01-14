import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import * as firebase from "firebase";

const initialState = [];

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get();
  return response.data();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user;

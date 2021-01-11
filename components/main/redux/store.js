import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";
import groupsReducer from "./reducers/groupsSlice";
// dummy code
import postsReducer from "./reducers/postsReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    groups: groupsReducer,
  },
});

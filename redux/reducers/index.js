import { combineReducers } from "redux";
import { user } from "./user";
import { groups } from "./group";

const Reducers = combineReducers({
  userState: user,
  groupState: groups,
});

export default Reducers;

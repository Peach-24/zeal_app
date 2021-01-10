import { USER_STATE_CHANGE, GROUP_STATE_CHANGE } from "../constants/index";

const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    // case GROUP_STATE_CHANGE:
    //   return {
    //     ...state,
    //     groups: action.groups,
    //   };
    default:
      return state;
  }
};

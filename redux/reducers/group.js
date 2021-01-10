import { GROUP_STATE_CHANGE } from "../constants/index";

const initialState = {
  groups: [],
};

export const groups = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_STATE_CHANGE:
      return {
        ...state,
        groups: action.groups,
      };
  }
};

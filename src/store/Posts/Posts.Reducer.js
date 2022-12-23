import { GETALLPOSTS } from "./Posts.Actions.Types";
import { UserLoginFailure, UserLoginsuccess } from "./UserActionsTypes";

const userState = {
  data: [],
  loading: false,
  error: false,
};
export const postReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case GETALLPOSTS: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
      };
    }

    case UserLoginFailure: {
      return {
        ...state,
        data: null,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};

import {
  UserLoginsuccess,
  UserLogout,
  UserTokenSuccess,
} from "./UserActionsTypes";

const userState = {
  data: {},
  token: "",
  loading: false,
  error: false,
};
export const userReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case UserLoginsuccess: {
      return {
        ...state,
        data: payload,
        loading: false,
        error: false,
      };
    }
    case UserTokenSuccess: {
      return {
        ...state,
        token: payload,
        loading: false,
        error: false,
      };
    }

    case UserLogout: {
      return {
        ...state,
        token: payload,

        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
};

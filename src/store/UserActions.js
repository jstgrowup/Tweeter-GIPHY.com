import { UserLoginsuccess } from "./UserActionsTypes";

export const userLogin = (payload) => (dispatch) => {
  dispatch({
    type: UserLoginsuccess,
    payload: payload,
  });
  return 
};

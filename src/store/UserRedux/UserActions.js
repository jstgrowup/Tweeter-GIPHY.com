import {
  UserLoginsuccess,
  UserLogout,
  UserTokenSuccess,
} from "./UserActionsTypes";
import axios from "axios";

export const userLogin = (token) => async (dispatch) => {
  try {
    dispatch({
      type: UserTokenSuccess,
      payload: token,
    });
    return token;
  } catch (error) {
    return error.message;
  }
};
export const getTheUser = (token) => async (dispatch) => {
  try {
    if (token) {
      const res = await axios.post("http://localhost:8080/user/getuser", {
        token: token,
      });
      
      const {
        data: { data },
      } = res;

      dispatch({
        type: UserLoginsuccess,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const logoutUser = () => (dispatch) => {
  return dispatch({
    type: UserLogout,
    payload: null,
  });
};

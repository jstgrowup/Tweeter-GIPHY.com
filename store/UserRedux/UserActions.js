import {
  UserLoginsuccess,
  UserLogout,
  UserTokenSuccess,
} from "./UserActionsTypes";
import axios from "axios";
import Cookies from "js-cookie";

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
      const res = await axios.post("/api/users/getuser", {
        token: token,
      });

      const {
        data: { data },
      } = res;
      const maindata = {
        _id: data._id,
        username: data.username,
        email: data.username,
        img: data.img,
      };
      dispatch({
        type: UserLoginsuccess,
        payload: maindata,
      });
      return maindata;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const logoutUser = () => (dispatch) => {
  Cookies.remove("loggedin");
  localStorage.removeItem("persist:root");
  return dispatch({
    type: UserLogout,
    payload: null,
  });
};

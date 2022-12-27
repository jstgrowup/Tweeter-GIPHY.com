import { UserLoginsuccess, UserTokenSuccess } from "./UserActionsTypes";
import axios from "axios";
export const userLogin = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/user/login", payload);

    const {
      data: { token },
    } = res;
    localStorage.setItem("lol", token);
    dispatch({
      type: UserTokenSuccess,
      payload: token,
    });
    return token;
  } catch (error) {
    return error.message;
  }
};
export const getTheUser = () => async (dispatch) => {
  const huru = localStorage.getItem("lol");
  try {
    if (huru) {
      const res = await axios.post("http://localhost:8080/user/getuser", {
        token: huru,
      });
      const { data } = res;

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

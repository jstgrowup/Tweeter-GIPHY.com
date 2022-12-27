import { UserLoginsuccess, UserTokenSuccess } from "./UserActionsTypes";
import axios from "axios";
export const userLogin = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("https://smoggy-worm-hospital-gown.cyclic.app/user/login", payload);

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
    console.log(error.message);
  }
};
export const getTheUser = () => async (dispatch) => {
  const huru = localStorage.getItem("lol");

  try {
    const res = await axios.post("https://smoggy-worm-hospital-gown.cyclic.app/user/getuser", {
      token: huru,
    });
    const { data } = res;

    dispatch({
      type: UserLoginsuccess,
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

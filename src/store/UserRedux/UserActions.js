import { UserLoginsuccess } from "./UserActionsTypes";
import axios from "axios";
export const userLogin = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/user/login", payload);
    console.log("res:", res);

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
export const getTheUser = (id) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/user/getuser", {
      id: id,
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

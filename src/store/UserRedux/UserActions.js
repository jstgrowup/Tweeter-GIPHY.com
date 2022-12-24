import { UserLoginsuccess } from "./UserActionsTypes";
import axios from "axios";
export const userLogin = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/user/login", payload);
    const { data } = res;
    const id = data._id;
    localStorage.setItem("lol", id);
    dispatch({
      type: UserLoginsuccess,
      payload: data,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getTheUser = () => async (dispatch) => {
  const id = localStorage.getItem("lol");
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

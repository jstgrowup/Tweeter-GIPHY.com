export const getAllPostsActions = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/user/login", payload);

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

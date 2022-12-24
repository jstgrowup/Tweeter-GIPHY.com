import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getTheUser } from "../store/UserRedux/UserActions";

function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  dispatch(getTheUser());
  const { data } = useSelector((store) => store.user);

  if (!data.username) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default PrivateRoute;

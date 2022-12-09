import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { data } = useSelector((store) => store.user);

  if (!data.username) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default PrivateRoute;

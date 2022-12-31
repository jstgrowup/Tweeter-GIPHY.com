import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { token } = useSelector((store) => store.user);

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default PrivateRoute;

import React from "react";

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("lol");
  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  return children;
}

export default PrivateRoute;

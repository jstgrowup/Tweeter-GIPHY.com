import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Private/PrivateRoute";
import Signin from "./Signin";
import Signup from "./Signup";
import TimeLine from "./TimeLine";
import UserProfile from "./UserProfile";

import Footer from "./Footer";
import Navbar from "../Components/Navbar";

function AllRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <PrivateRoute>
              <TimeLine />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default AllRoutes;

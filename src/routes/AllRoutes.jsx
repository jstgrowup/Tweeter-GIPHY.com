import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import PrivateRoute from "../Private/PrivateRoute";
import Signin from "./Signin";
import Signup from "./Signup";
import TimeLine from "./TimeLine";
import UserProfile from "./UserProfile";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { getTheUser } from "../store/UserRedux/UserActions";
function AllRoutes() {
  const { colorMode, toggleColorMode } = useColorMode();
 
  return (
    <div style={{ height: "700px" }}>
      <Flex
        bg={useColorModeValue("#166FE6", "#166FE6")}
        w={"100%"}
        h={"100px"}
        justify={"space-around"}
        align={"center"}
      >
        <NavLink to={"/"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Signup Page
          </Button>
        </NavLink>
        <NavLink to={"/signin"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Sign in
          </Button>
        </NavLink>
        <NavLink to={"/profile"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            User Profile
          </Button>
        </NavLink>
        <NavLink to={"/timeline"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Timeline
          </Button>
        </NavLink>
        <Button
          bg={useColorModeValue("white", "black")}
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </Flex>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/profile"
          element={
            <UserProfile />
            // <PrivateRoute>
            // </PrivateRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <TimeLine />
            // <PrivateRoute>
            // </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default AllRoutes;

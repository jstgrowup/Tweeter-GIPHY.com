import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./routes/Signup";
import Signin from "./routes/Signin";
import PrivateRoute from "./Private/PrivateRoute";
import UserProfile from "./routes/UserProfile";
import TimeLine from "./routes/TimeLine";
import Footer from "./Components/Footer";

import { Box, useColorModeValue } from "@chakra-ui/react";

function App() {
  return (
    <Box bg={useColorModeValue("#CCDEFF", "#171923")}>
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
    </Box>
  );
}

export default App;

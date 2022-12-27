import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTheUser, userLogin } from "../store/UserRedux/UserActions";
function Signin() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const postUser = async () => {
    const { email, username, password } = formData;
    if (!email || !username || !password) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    try {
      dispatch(userLogin(formData));
      toast({
        title: "Login success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/timeline");
      toast({
        title: "You can now proceeed to timeline",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `${e.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  // useEffect(() => {
  //   dispatch(getTheUser());
  // }, []);

  const handleSubmit = () => {
    postUser();
  };
  return (
    <div>
      {" "}
      <Center p={"10"}>
        <Box
          w={["300", "420px", "490px", "520px"]}
          bg={useColorModeValue("white", "white")}
          color={useColorModeValue("black", "black")}
          borderRadius={"2xl"}
          boxShadow={"2xl"}
        >
          <Flex
            direction={"column"}
            align="start"
            p={["8", "5", "6", "8"]}
            gap={"3"}
          >
            <Heading>Sign In</Heading>
            <Text fontSize={"sm"} align={"start"}>
              User Name{" "}
            </Text>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"username"}
              onChange={handleChange}
              placeholder="Enter your User Name"
            ></Input>

            <Text fontSize={"sm"} align={"start"}>
              EMAIL ID{" "}
            </Text>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"email"}
              onChange={handleChange}
              placeholder="Enter your Email Id"
            ></Input>
            <Text fontSize={"sm"}>Password</Text>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"password"}
              onChange={handleChange}
              placeholder="Enter Your Password"
            ></Input>

            <Button
              onClick={handleSubmit}
              _hover={{ bg: "#24AEB1" }}
              color={"white"}
              size={"lg"}
              width={"100%"}
              bg={"#24AEB1"}
            >
              Sign In
            </Button>
          </Flex>
        </Box>
      </Center>
    </div>
  );
}

export default Signin;

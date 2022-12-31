import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { userLogin } from "../store/UserRedux/UserActions";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Signin() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const notify = () => {
    return toast({
      title: "Welcome! back",
      description: "You can now proceeed to timeline",
      position: "top-left",
      status: "loading",
      variant: "left-accent",
      isClosable: true,
      duration: 2000,
    });
  };
  const welcome = () => {
    return toast({
      title: "Welcome! to tweeter",
      description: "If you already have an account please Login",
      position: "top-left",
      status: "loading",
      variant: "left-accent",
      isClosable: true,
      duration: 2000,
    });
  };
  useEffect(() => {
    welcome();
  }, []);
  const postUser = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    try {
      setloading(true);
      const res = await axios.post(
        "http://localhost:8080/user/login",
        formData
      );

      const {
        data: { token, message },
      } = res;
      toast({
        title: message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(userLogin(token));
      notify();
      setloading(false);
      navigate("/");
    } catch (e) {
      setloading(true);
      toast({
        title: `${e.response.data.message}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setloading(false);
    }
  };

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
            <Heading>Log In</Heading>

            <Text fontSize={"sm"} align={"start"}>
              Email Id{" "}
            </Text>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"email"}
              onChange={handleChange}
              placeholder="Enter your Email Id"
            ></Input>
            <Text fontSize={"sm"}>Password</Text>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                borderColor={"black"}
                type={show ? "text" : "password"}
                name={"password"}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <InputRightElement onClick={handleClick} cursor={"pointer"}>
                {show ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />}
              </InputRightElement>
            </InputGroup>
            <Link to={"/signup"}>
              <Text>
                Dont Have an account?{" "}
                <span style={{ color: "red" }}>Create an Account</span>{" "}
              </Text>
            </Link>
            <Button
              isLoading={loading}
              loadingText={"Submitting"}
              onClick={handleSubmit}
              _hover={{ bg: "#24AEB1" }}
              color={"white"}
              size={"lg"}
              width={"100%"}
              bg={"#24AEB1"}
            >
              Log In
            </Button>
          </Flex>
        </Box>
      </Center>
    </div>
  );
}

export default Signin;

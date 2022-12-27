import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    img: "https://i.pravatar.cc/300",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const notify = () => {
    return toast({
      title: "Welcome! to tweeter",
      description: "If you already have an account please Login",
      position: "top-left",
      status: "loading",
      variant: "left-accent",
      containerStyle: {
        width: "100px",
        height: "100%",
      },
      isClosable: true,
      duration: 2000,
    });
  };
  useEffect(() => {
    notify();
  }, []);

  const postUser = async () => {
    const { email, fullname, password } = formData;

    if (!email || !fullname || !password) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/user/postUser",

        formData
      );
      toast({
        title: "Signup successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/signin");
    } catch (e) {
      toast({
        title: `${e.response.data}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleSubmit = () => {
    postUser();
  };
  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  return (
    <Center p={["3", "3", "6", "10"]}>
      <Box
        w={["400", "430px", "490px", "520px"]}
        bg={useColorModeValue("white", "white")}
        color={useColorModeValue("black", "black")}
        borderRadius={"2xl"}
        boxShadow={"2xl"}
      >
        <Flex
          direction={"column"}
          align="start"
          p={["6", "5", "6", "8"]}
          gap={"3"}
        >
          <Heading>Create Account</Heading>
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
            Full Name{" "}
          </Text>
          <Input
            borderColor={"black"}
            type={"text"}
            name={"fullname"}
            onChange={handleChange}
            placeholder="Enter your Full Name"
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
            color={"white"}
            size={"lg"}
            width={"100%"}
            _hover={{ bg: "#24AEB1" }}
            bg={"#24AEB1"}
          >
            Signup
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}

export default Signup;

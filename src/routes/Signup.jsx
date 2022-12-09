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
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const toast = useToast();
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
    const { username } = formData;
    try {
      let resp = await axios.get("https://mock-v41w.onrender.com/users");
      const { data } = resp;

      let huru = data.find((el) => el.username === username);

      if (huru) {
        toast({
          title: "User Already Registered",
          description: "User Already Registered please proceed to signin",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const res = await axios.post(
          "https://mock-v41w.onrender.com/users",
          formData
        );

        toast({
          title: "Signup successfull",

          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/signin");
      }
    } catch (e) {
      alert(`rightcompo condition failed: ${e.message}`);
    }
  };
  const handleSubmit = () => {
    postUser();
  };

  return (
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
          p={["4", "5", "6", "8"]}
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
            bg={"#24AEB1"}
          >
            VERIFY
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}

export default Signup;

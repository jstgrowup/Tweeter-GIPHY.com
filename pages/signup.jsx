import React, { useState } from "react";
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
import axios from "axios";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
function Signup() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [loading, setloading] = useState(false);

  const [formData, setformData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    img: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 10
    )}.jpg`,
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
    try {
      setloading(true);
      const res = await axios.post(
        "/api/users/postUser",

        formData
      );

      toast({
        title: `${res.data.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    } catch (e) {
      setloading(true);
      toast({
        title: `${e.response.data.message}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    }
  };
  const handleSubmit = () => {
    postUser();
  };

  return (
    <Center
      p={["3", "3", "6", "10"]}
      bg={useColorModeValue("#CCDEFF", "#171923")}
    >
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

          <Button
            isLoading={loading}
            loadingText={"Submitting"}
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

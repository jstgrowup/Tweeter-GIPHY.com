import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
function VerifyEmail() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setloading] = useState(false);
  const params = useRouter();
  const { token } = params.query;
  const toast = useToast();
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const verify = async () => {
    setloading(true);
    const payload = {
      email: token,
      password: confirmpassword,
    };
    if (password !== confirmpassword) {
      return alert("passwords doesnt match");
    }
    try {
      const res = await axios.post("/api/token/change", payload);
      if (res.status == 200) {
        Router.push("/signin");
        const {
          data: { message },
        } = res;
        toast({
          title: message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setloading(false);
      }
    } catch (error) {
      toast({
        title: `${error.response.data.message}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setloading(false);
    }
  };

  const handleSubmit = () => {
    verify();
  };
  return (
    <>
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
            <Heading size={"md"}>Please enter your new Password</Heading>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                borderColor={"black"}
                type={show ? "text" : "password"}
                name={"password"}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter Your Password"
              />
              <InputRightElement onClick={handleClick} cursor={"pointer"}>
                {show ? <ViewIcon boxSize={5} /> : <ViewOffIcon boxSize={5} />}
              </InputRightElement>
            </InputGroup>

            <Heading size={"md"}>Confirm Password</Heading>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                borderColor={"black"}
                type={show ? "text" : "password"}
                name={"password"}
                onChange={(e) => setconfirmpassword(e.target.value)}
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
              _hover={{ bg: "#24AEB1" }}
              color={"white"}
              size={"lg"}
              width={"100%"}
              bg={"#24AEB1"}
            >
              Change Password
            </Button>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default VerifyEmail;

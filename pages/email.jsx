import {
  Box,
  Input,
  useColorModeValue,
  useToast,
  Button,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function Email() {
  const toast = useToast();
  const [uemail, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const verify = async () => {
    const payload = {
      email: uemail,
    };

    try {
      setloading(true);
      const res = await axios.post(`/api/token/find`, payload);
      if (res.status === 200) {
        toast({
          title: `${res.data.message}`,
          description: "Please check the spam section in your Email",
          position: "top-left",
          status: "loading",
          variant: "left-accent",
          isClosable: true,
          duration: 3000,
        });
      }
      setloading(false);
    } catch (error) {
      setloading(true);

      toast({
        title: `${error.response.data.message}`,
        position: "top-left",
        status: "loading",
        variant: "left-accent",
        isClosable: true,
        duration: 2000,
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
            <Heading size={"md"}>Please enter your email ID</Heading>
            <Input
              borderColor={"black"}
              type={"text"}
              name={"email"}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email Id"
            ></Input>

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
    </>
  );
}

export default Email;

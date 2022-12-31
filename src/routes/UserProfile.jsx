import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useDisclosure,
  Flex,
  Input,
  useToast,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { BiDislike, BiLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getTheUser, logoutUser } from "../store/UserRedux/UserActions";
import DeleteButton from "../Components/DeleteButton";
import { Logoutfunction } from "../utils/Logout";
const getData = async (token) => {
  try {
    const res = await axios.post("https://smoggy-worm-hospital-gown.cyclic.app/posts/getUsersPosts", {
      token: token,
    });
    const { data } = res;
    return data;
  } catch (error) {
    
    return error.message;
  }
};
function UserProfile() {
  const { data, token } = useSelector((store) => store.user);

  const [bool, setbool] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wholeData, setwholeData] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    onOpen();
  };
  const postUser = async (id) => {
    const { fullname, email, password } = formData;
    if (!fullname || !email || !password) {
      alert("please enter all the required fields");
    }

    try {
      await axios.patch(`https://smoggy-worm-hospital-gown.cyclic.app/user/updateUser/${id}`, {
        fullname: fullname,
        email: email,
        password: password,
      });

      onClose();
      toast({
        title: "Updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(getTheUser(token));
    } catch (e) {
      onClose();
      toast({
        title: "Something is wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getData(token)
      .then((res) => setwholeData(res))
      .catch((er) => console.log(er));
    dispatch(getTheUser(token));
  }, [bool]);
  const handlePostsDelete = async (id) => {
    try {
      await axios.post(`https://smoggy-worm-hospital-gown.cyclic.app/posts/delete`, {
        id: id,
      });
      toast({
        title: "Post deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setbool(!bool);
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleSubmit = (id) => {
    postUser(id);
  };
  const handleDelete = async (id) => {
    try {
      await axios.post("https://smoggy-worm-hospital-gown.cyclic.app/user/delete", { id: id });
      toast({
        title: "Deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      dispatch(logoutUser());
      navigate("/signin");
      toast({
        title: "Account deleted successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogout = () => {
    return Logoutfunction(navigate, dispatch, logoutUser, toast);
  };
  return (
    <>
      <Center>
        <Center w={["90%", "80%", "70%", "50%"]}>
          <Box
            height={"100%"}
            w={"100%"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              size={"xl"}
              src={data.img}
              alt={"Avatar Alt"}
              mb={4}
              pos={"relative"}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              @{data.username}
            </Heading>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {data.fullname}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {data.email}
            </Text>
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                color={"white"}
                bg={"blackAlpha.500"}
                _focus={{
                  bg: "black.200",
                }}
              >
                Followers {"23"}
              </Button>
              <Button
                onClick={handleLogout}
                flex={1}
                fontSize={"md"}
                rounded={"full"}
                bg={"#48BB78"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "#48BB78",
                }}
                _focus={{
                  bg: "#48BB78",
                }}
              >
                Logout
              </Button>
            </Stack>
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                onClick={handleUpdate}
                flex={1}
                color={"white"}
                fontSize={"sm"}
                rounded={"full"}
                bg={"#ED8936"}
                _hover={{
                  bg: "#ED8936",
                }}
                _focus={{
                  bg: "#ED8936",
                }}
              >
                Edit Profile
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex direction={"column"} align="start" p={"3"} gap={"3"}>
                      <Text fontSize={"sm"} align={"start"}>
                        Full Name{" "}
                      </Text>
                      <Input
                        type={"text"}
                        name={"fullname"}
                        onChange={handleChange}
                        placeholder="Enter your full Name"
                      ></Input>

                      <Text fontSize={"sm"} align={"start"}>
                        EMAIL ID{" "}
                      </Text>
                      <Input
                        type={"text"}
                        name={"email"}
                        onChange={handleChange}
                        placeholder="Enter your Email Id"
                      ></Input>
                      <Text fontSize={"sm"}>Password</Text>
                      <Input
                        type={"text"}
                        name={"password"}
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                      ></Input>

                      <Button
                        onClick={() => handleSubmit(data._id)}
                        color={"white"}
                        size={"lg"}
                        width={"100%"}
                        bg={"#24AEB1"}
                      >
                        Update
                      </Button>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Button
                flex={1}
                fontSize={"md"}
                rounded={"full"}
                bg={"red.500"}
                color={"white"}
                onClick={() => handleDelete(data._id)}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "red.500",
                }}
                _focus={{
                  bg: "red.500",
                }}
              >
                Delete Account
              </Button>
            </Stack>
          </Box>
        </Center>
      </Center>
      <Center>
        <Heading>Your Posts</Heading>
      </Center>
      <Flex gap={"3"} align={"center"} direction={"column"}>
        {wholeData.length > 0 ? (
          wholeData.map((el) => {
            return (
              <Flex
                boxShadow={"2xl"}
                borderRadius={"2xl"}
                bg={"white"}
                w={["90%", "80%", "70%", "50%"]}
                direction={"column"}
                align={"flex-start"}
                color={useColorModeValue("black", "black")}
                key={el._id}
              >
                <Flex w={"100%"} align={"center"} justify={"space-between"}>
                  <Flex align={"center"} gap={"3"}>
                    <Avatar border={"2px"} size="md" src={data.img} />
                    <Flex direction={"column"} gap={"1"}>
                      <Text fontSize={"lg"} fontWeight={"bold"}>
                        {" "}
                        {el.userName}
                      </Text>
                      <Text fontSize={"lg"} fontWeight={"bold"}>
                        {" "}
                        {el.caption}
                      </Text>
                    </Flex>
                  </Flex>
                  {el.userName === data.username && (
                    <DeleteButton
                      handleDelete={handlePostsDelete}
                      _id={el._id}
                    />
                  )}
                </Flex>
                <Text>{el.title}</Text>
                <Image w={"100%"} h={"300px"} src={el.url}></Image>
                <Flex ml={"2"} gap={"3"}>
                  <BiLike
                    className="huru"
                    onClick={() => handleLikesAndDislikes(el._id, "like")}
                  />
                  <Text fontWeight={"bold"}>{el.likes}</Text>
                  <BiDislike
                    className="huru"
                    onClick={() => handleLikesAndDislikes(el._id, "dislikes")}
                  />

                  <Text fontWeight={"bold"}>{el.dislikes}</Text>
                </Flex>
              </Flex>
            );
          })
        ) : (
          <Image src="https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/1kutzil5lj0nvfsf_1596544016.jpeg" />
        )}
      </Flex>
    </>
  );
}

export default UserProfile;

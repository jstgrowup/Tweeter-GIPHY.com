import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import "./Timeline.css";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { BiDislike, BiLike } from "react-icons/bi";
import { getTheUser } from "../store/UserRedux/UserActions";
const getData = async () => {
  try {
    const res = await axios.get("http://localhost:8080/posts");
    const { data } = res;
    return data;
  } catch (error) {
    return error.message;
  }
};
function TimeLine() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSelector((store) => store.user);

  const toast = useToast();
  const [searchdata, setdata] = useState([]);
  const [wholeData, setwholeData] = useState([]);
  console.log("wholeData:", wholeData);
  const [bool, setbool] = useState(false);
  const [text, settext] = useState("");
  const [url, seturl] = useState("");

  const handleChange = async (e) => {
    let huru = e.target.value;
    try {
      let res = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=HbK8mqA6OKEAQ0aIUVz2FEP3H985n1lM&q=${huru}&limit=25&offset=0&rating=g&lang=en`
      );
      let {
        data: { data },
      } = res;

      setdata(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePost = (url) => {
    seturl(url);
    onClose();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getData()
      .then((res) => setwholeData(res))
      .catch((er) => console.log(er));
    dispatch(getTheUser());
  }, [bool]);
  const handleSubmit = async () => {
    const respo = {
      userId: data._id,
      userName: data.username,
      caption: text,
      url: url,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/posts/createPost",
        respo
      );

      setbool(!bool);

      seturl(null);
      toast({
        title: "Post successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      let resp = await axios.delete(
        `https://mock-v41w.onrender.com/posts/${id}`
      );
      toast({
        title: "Post deleted successfully",

        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setbool(!bool);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Center>
        <Box
          w={"50%"}
          p={"7"}
          boxShadow={"2xl"}
          borderRadius={"2xl"}
          bg={"white"}
        >
          <Textarea
            color={"black"}
            placeholder="Enter your caption"
            border={"1px"}
            borderColor={"black"}
            name="caption"
            onChange={(e) => settext(e.target.value)}
          />
          {url && <Image w={"100%"} h={"200px"} src={url} />}
          <Flex justify={"space-between"}>
            <Button
              onClick={onOpen}
              _hover={useColorModeValue("#FFDD00", "#FFDD00")}
              bg={useColorModeValue("#FFDD00", "#FFDD00")}
              color={useColorModeValue("black", "black")}
            >
              GIF
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Search Your GIPHY</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box style={{ overflowY: "scroll", maxHeight: "450px" }}>
                    <Input
                      onChange={handleChange}
                      placeholder="Search your GIPHY"
                    />

                    {searchdata?.map((el) => {
                      const { images } = el;

                      return (
                        <Box
                          key={el.id}
                          onClick={() => handlePost(images.preview_gif.url)}
                        >
                          <Image
                            w={"100%"}
                            src={images.preview_gif.url}
                          ></Image>
                        </Box>
                      );
                    })}
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Button onClick={handleSubmit} colorScheme={"blue"} color={"white"}>
              POST
            </Button>
          </Flex>
        </Box>
      </Center>
      <Center>
        <Flex
          mt={"4"}
          w={"50%"}
          gap={"4"}
          // bg={useColorModeValue("white", "white")}
          color={useColorModeValue("black", "black")}
          direction={"column"}
          align={"flex-start"}
        >
          {wholeData?.map((el) => {
            return (
              <Flex
                boxShadow={"2xl"}
                borderRadius={"2xl"}
                bg={"white"}
                w={"100%"}
                direction={"column"}
                align={"flex-start"}
                key={el._id}
              >
                <Flex w={"100%"} align={"center"} justify={"space-between"}>
                  <Flex align={"center"} gap={"3"}>
                    <Avatar size="md" src={data.img} />
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      {" "}
                      {el.userName}
                    </Text>
                  </Flex>
                  {el.userName === data.username && (
                    <Button
                      onClick={() => handleDelete(el.id)}
                      bg={"red.400"}
                      color={"white"}
                      borderRadius={"3xl"}
                    >
                      DELETE
                    </Button>
                  )}
                </Flex>
                <Text>{el.title}</Text>
                <Image w={"100%"} h={"300px"} src={el.url}></Image>
                <Flex ml={"2"} gap={"3"}>
                  <BiLike
                    className="huru"
                    onClick={() => handleLikesAndDislikes(el.id, "like")}
                  />
                  <Text fontWeight={"bold"}>{el.likes}</Text>
                  <BiDislike
                    className="huru"
                    onClick={() => handleLikesAndDislikes(el.id, "dislikes")}
                  />

                  <Text fontWeight={"bold"}>{el.dislikes}</Text>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Center>
    </div>
  );
}

export default TimeLine;

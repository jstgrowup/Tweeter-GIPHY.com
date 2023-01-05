import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Skeleton,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
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
import DeleteButton from "../Components/DeleteButton";
import { getTheUser } from "../store/UserRedux/UserActions";
const getData = async () => {
  try {
    const res = await axios.get("/api/posts");
    const { data } = res;
    return data;
  } catch (error) {
    return error.message;
  }
};
export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, token } = useSelector((store) => store.user);
  const toast = useToast();
  const [searchdata, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [wholeData, setwholeData] = useState([]);
  const dispatch = useDispatch();
  const [bool, setbool] = useState(false);
  const [text, settext] = useState("");
  const [url, seturl] = useState("");
  
  const handleChange = async (e) => {
    let huru = e.target.value;
    try {
      let res = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_KEY}&q=${huru}&limit=25&offset=0&rating=g&lang=en`
      );
      let {
        data: { data },
      } = res;

      setdata(data);
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handlePost = (url) => {
    seturl(url);
    onClose();
  };

  useEffect(() => {
    setloading(false);
    getData()
      .then((main) => {
        setwholeData(main);
        setloading(true);
      })
      .catch((er) => {
        console.log(er);
        setloading(true);
      });

    dispatch(getTheUser(token));
  }, [bool]);
  const handleSubmit = async () => {
    const respo = {
      userId: data._id,
      userName: data.username,
      caption: text,
      url: url,
    };
    if (!url || !text) {
      toast({
        title: "All the inputs are mendatory",
        description:
          "For a successfull post you have to put the cption and select a gif",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      await axios.post("/api/posts/createPost", respo);
      setbool(!bool);
      seturl(null);
      toast({
        title: "Posted successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.post(`/api/posts/delete`, {
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
  const handleLikesAndDislikes = async (id, type) => {
    try {
      await axios.post("/api/posts/likesAndDislikes", {
        id: id,
        type: type,
      });
  
    } catch (error) {
      toast({
        title: `${error.message}`,

        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box bg={useColorModeValue("#CCDEFF", "black")}>
        <Center>
          <Box
            w={["90%", "80%", "70%", "50%"]}
            p={["2", "4", "5", "7"]}
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
                    <Box
                      style={{
                        overflowY: "scroll",
                        maxHeight: "450px",
                      }}
                    >
                      <Input
                        onChange={handleChange}
                        placeholder="Search your GIPHY"
                      />

                      {searchdata?.map((el) => {
                        const { images } = el;

                        return (
                          <Box
                            cursor={"pointer"}
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

              <Button
                onClick={handleSubmit}
                colorScheme={"blue"}
                color={"white"}
              >
                POST
              </Button>
            </Flex>
          </Box>
        </Center>
        <Center>
          <Flex
            mt={"4"}
            w={["95%", "80%", "70%", "50%"]}
            gap={"4"}
            color={useColorModeValue("black", "black")}
            direction={"column"}
            align={"flex-start"}
          >
            <Skeleton isLoaded={loading} w="100%">
              {wholeData?.map((el) => {
                return (
                  <Flex
                    boxShadow={"2xl"}
                    border={"2px"}
                    borderColor={"white"}
                    borderRadius={"2xl"}
                    w={"100%"}
                    key={el._id}
                    bgColor={useColorModeValue("white", "black")}
                    color={useColorModeValue("black", "white")}
                    direction={"column"}
                    align={"flex-start"}
                  >
                    <Flex w={"100%"} align={"center"} justify={"space-between"}>
                      <Flex align={"center"} gap={"3"}>
                        <Avatar size="md" src={data.img} />
                        <Flex direction={"column"}>
                          <Text fontSize={"lg"} fontWeight={"bold"}>
                            {" "}
                            {el.userName}
                          </Text>
                          <Text fontSize={"lg"}> {el.caption}</Text>
                        </Flex>
                      </Flex>
                      {el.userId === data._id && (
                        <DeleteButton
                          handleDelete={handleDelete}
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
                        onClick={() =>
                          handleLikesAndDislikes(el._id, "dislikes")
                        }
                      />

                      <Text fontWeight={"bold"}>{el.dislikes}</Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Skeleton>
          </Flex>
        </Center>
      </Box>
    </>
  );
}

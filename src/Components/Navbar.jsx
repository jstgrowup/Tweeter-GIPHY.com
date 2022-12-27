import React from "react";
import {
  Button,
  HStack,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <HStack
        display={{ base: "none", md: "flex" }}
        bg={useColorModeValue("#166FE6", "#166FE6")}
        w={"100%"}
        h={"100px"}
        justify={"space-around"}
        align={"center"}
      >
        <NavLink to={"/"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Signup Page
          </Button>
        </NavLink>
        <NavLink to={"/signin"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Sign in
          </Button>
        </NavLink>
        <NavLink to={"/profile"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            User Profile
          </Button>
        </NavLink>
        <NavLink to={"/timeline"}>
          <Button
            bg={useColorModeValue("white", "black")}
            color={useColorModeValue("black", "white")}
          >
            Timeline
          </Button>
        </NavLink>
        <Button
          bg={useColorModeValue("white", "black")}
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          _focus={{ boxShadow: "none" }}
          w="fit-content"
        >
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </HStack>
      <Flex
        height={["70px", "70px", "0px", "0px"]}
        align={"center"}
        justify={"flex-end"}
        bg={useColorModeValue("#166FE6", "#166FE6")}
      >
        <Button
          display={{ base: "flex", md: "none" }}
          variant={"none"}
          onClick={onOpen}
        >
          <HamburgerIcon boxSize={8} color={"white"} />
        </Button>
      </Flex>
      <Drawer
        onClose={onClose}
        isOpen={isOpen}
        size={"full"}
        bg={useColorModeValue("#166FE6", "#166FE6")}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Box w={"full"} mb={3}>
              <Button
                w={"full"}
                size={"lg"}
                as={NavLink}
                to={"/signin"}
                bg={"#166FE6"}
                color={"white"}
                letterSpacing={1}
              >
                Login
              </Button>
            </Box>
            <Box w={"full"} mb={3}>
              <Button
                w={"full"}
                size={"lg"}
                as={NavLink}
                to={"/"}
                bg={"#166FE6"}
                color={"white"}
                letterSpacing={1}
              >
                Signup Page
              </Button>
            </Box>
            <Box w={"full"} mb={3}>
              <Button
                w={"full"}
                size={"lg"}
                as={NavLink}
                to={"/profile"}
                bg={"#166FE6"}
                color={"white"}
                letterSpacing={1}
                leftIcon={<FaUserAlt />}
              >
                Profile
              </Button>
            </Box>
            <Box w={"full"} mb={3}>
              <Button
                w={"full"}
                size={"lg"}
                as={NavLink}
                to={"/timeline"}
                bg={"#166FE6"}
                color={"white"}
                letterSpacing={1}
              >
                Timeline
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Navbar;

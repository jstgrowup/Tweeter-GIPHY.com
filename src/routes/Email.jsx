import { Box, Button, Center, Flex, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Email() {
  const [valid, setvalid] = useState(false);
  const { id, token } = useParams();
  const verify = async () => {
    try {
      const url = `http://localhost:8080/user/${id}/verify/${token}`;
      const { data } = await axios.get(url);

      setvalid(true);
    } catch (error) {
      setvalid(false);
    }
  };
  useEffect(() => {
    verify();
  }, [id]);

  return (
    <>
      {valid ? (
        <Center>
          <Flex direction={"column"} gap={"4"} align={"center"}>
            <Image src="https://user-images.githubusercontent.com/40628582/210125289-4cb3584c-181d-48d6-abbb-f837ac0ad1a5.png" />
            <Link to={"/signin"}>
              <Button colorScheme={"whatsapp"} size={"lg"}>
                Proceed to Login{" "}
              </Button>
            </Link>
          </Flex>
        </Center>
      ) : (
        <Box>
          <Heading>Invalid Link</Heading>
        </Box>
      )}
    </>
  );
}

export default Email;

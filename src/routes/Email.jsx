import { Box, Button, Heading } from "@chakra-ui/react";
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
      console.log(data);
      setvalid(true);
    } catch (error) {
      console.log("error:", error);
      setvalid(false);
    }
  };
  useEffect(() => {
    verify();
  }, [id]);

  return (
    <>
      {valid ? (
        <Box>
          <Heading>Verifed</Heading>
          <Link to={"/signin"}>
            <Button> Login </Button>
          </Link>
        </Box>
      ) : (
        <Box>
          <Heading>{id}</Heading>
          <Heading>{token}</Heading>
        </Box>
      )}
    </>
  );
}

export default Email;

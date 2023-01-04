import { Button } from "@chakra-ui/react";
import React from "react";

function DeleteButton({ handleDelete, _id }) {
  return (
    <Button
      size={"md"}
      onClick={() => handleDelete(_id)}
      bg={"red.500"}
      color={"white"}
      borderRadius={"xl"}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;

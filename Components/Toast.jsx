import { useToast } from "@chakra-ui/react";

function Toast({ title, description = null, status }) {
  const toast = useToast();
  return toast({
    title: title,
    description: description,
    status: status,
    duration: 3000,
    isClosable: true,
  });
}

export default Toast;

export const Logoutfunction = (navigate, dispatch, logoutUser, toast) => {
    navigate.push("/");
    dispatch(logoutUser());
  
    toast({
      title: "Logout successfull",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };
  
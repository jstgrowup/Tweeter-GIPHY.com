export const Logoutfunction = (navigate, dispatch, logoutUser, toast) => {
  navigate("/");
  dispatch(logoutUser());

  toast({
    title: "Logout successfull",
    status: "success",
    duration: 1000,
    isClosable: true,
  });
};

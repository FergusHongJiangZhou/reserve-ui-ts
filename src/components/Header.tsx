import React, { useEffect } from "react";
import { Button, Box, Flex, Image, Heading, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { userData, fetchUser } from "../features/user/userSlice";
import { commonData } from "../features/common/commonSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";

function Header() {
  const navigate = useNavigate();
  const { user, userStatus } = useAppSelector(userData);
  const { hasError } = useAppSelector(commonData);
  const userId = localStorage.getItem("userId") || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Flex direction="row" justify="center">
            <Image src={logo} w="50px" mr="4" />
            <Heading size="lg">{`Welcome ${user.name}`}</Heading>
          </Flex>
        </Box>
        <Spacer />
        {!!userId && (
          <Button
            _hover={{ bgColor: "tomato" }}
            w="10%"
            colorScheme="teal"
            marginRight="20px"
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Flex>
      {
        hasError && <Box style={{color: `red`}}>some error occurred, while fetching api</Box>
      }
    </Box>
  );
}

export default Header;

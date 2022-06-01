import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/user/userAPI";
import { useToastHook } from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useToastHook();

  const handleUserName = (e: any) => {
    setName(e.target.value);
  };
  const isNameError = name === "";
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const isPasswordError = password === "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name && password) {
      try {
        const { data } = await login(name, password);
      if (data.login?.accessToken) {
        localStorage.setItem("token", data.login?.accessToken);
        localStorage.setItem("userId", data.login?.userId);
        navigate("/reservations");
      }
      } catch (error: any) {
        setError({ message: error.message || "Login Failed!", status: "error" })
      }
    }
  };
  const isButtonDisabled = !(name && password);
  return (
    <Box
      w="400px"
      mx="auto"
      mt="80px"
      bgColor="gray.200"
      p={3}
      boxShadow="lg"
      borderRadius="lg"
    >
      <Flex direction="row" align="center" justify="center" my="4">
        <Heading size="lg">Login</Heading>
      </Flex>
      <form>
        <Stack spacing="2">
          <FormControl isRequired isInvalid={isNameError}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              bgColor="gray.50"
              placeholder="Please input your name"
              onChange={handleUserName}
            />
            {isNameError && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isPasswordError}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              placeholder="Please input password"
              type="password"
              bgColor="white"
              onChange={handlePassword}
            />
            {isPasswordError && (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            _hover={{ bgColor: "tomato" }}
            w="100%"
            colorScheme="teal"
            isDisabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button
            _hover={{ bgColor: "tomato" }}
            w="100%"
            colorScheme="teal"
            onClick={() => navigate("register")}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Login;

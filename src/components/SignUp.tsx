import React, { useState } from "react";
import {
  Input,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { register } from "../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import { useToastHook } from "../components/Toast";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
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
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const isPhoneError = phone === "";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (name && phone && password) {
       const newUser = await register(name, phone, password);
        if (newUser.data.addUser?.id) {
          navigate("/");
        }
      }
    } catch (error: any) {
      setError({message: error.message, status: "error"})
    }
  };
  const isButtonDisabled = !(name && phone && password);

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
        <Heading size="lg">Register</Heading>
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
          <FormControl isRequired isInvalid={isPhoneError}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              id="phone"
              bgColor="gray.50"
              placeholder="Please input your phone number"
              onChange={handlePhone}
            />
            {isPhoneError && (
              <FormErrorMessage>Phone number is required.</FormErrorMessage>
            )}
          </FormControl>
          <Button
            _hover={{ bgColor: "tomato" }}
            w="100%"
            colorScheme="teal"
            isDisabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SignUp;

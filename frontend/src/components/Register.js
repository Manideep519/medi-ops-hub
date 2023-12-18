'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    let { name, value } = e.target;
    setRegisterData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleDisabeRegister() {
    console.log(registerData);
    if (registerData.email.length === 0) {
      return true;
    } else if (registerData.firstName.length === 0) {
      return true;
    } else if (registerData.lastName.length === 0) {
      return true;
    } else if (registerData.password.length === 0) {
      return true;
    } else if (registerData.phoneNumber === 0) {
      return true;
    } else {
      return false;
    }
  }

  async function handleRegister() {
    if (handleDisabeRegister()) {
      toast.info('Please enter all the required fields', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post('/users/register', {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        phoneNumber: registerData.phoneNumber,
        email: registerData.email,
        password: registerData.password,
      });
      navigate('/login');
      setLoading(false);
      toast.success('Registration successful', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(result);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err.response.data.message);
    }
  }
  return (
    <Flex
      style={{ height: `calc(100vh - 61px)` }}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone number</FormLabel>
              <Input
                type="tel"
                name="phoneNumber"
                value={registerData.phoneNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleRegister}
                loadingText="Submitting"
                size="lg"
                colorScheme="teal"
              >
                {loading ? <Spinner /> : 'Register'}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text fontSize="lg" align={'center'}>
                Already a user?{' '}
                <Link to={'/login'}>
                  {' '}
                  <u>Login</u>{' '}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

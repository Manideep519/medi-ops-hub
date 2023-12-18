import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Heading,
  Spinner,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext, UserContext } from '../App';
export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { updateUserDetails } = useContext(UserContext);
  const { updateAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    let { name, value } = e.target;
    setLoginData(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleLogin() {
    setLoading(true);
    try {
      const response = await axios.post('/users/login', {
        email: loginData.email,
        password: loginData.password,
      });
      updateAuth(response.data?.token);
      updateUserDetails(response.data?.userDetails);
      setLoading(false);
      navigate('/dashboard');
      toast.success('Login successful', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('Invalid cedrentials', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
      console.log(err.message);
    }
  }

  return (
    <Flex
      style={{ height: `calc(100vh - 61px)` }}
      pt={'100px'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box
          minWidth={'464px'}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={loginData.email}
                name="email"
                onChange={handleChange}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  name="password"
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

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox colorScheme="teal">Remember me</Checkbox>
                <Link to={'/forgotpassword'}>
                  <Text color={'teal.600'}>Forgot password?</Text>
                </Link>
              </Stack>

              <Button onClick={handleLogin} width={'100%'} colorScheme="teal">
                {loading ? <Spinner /> : 'Login'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

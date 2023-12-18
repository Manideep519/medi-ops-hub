import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const UserSettings = () => {
  return (
    <Box>
      <Flex gap={'20px'}>
        <VStack alignItems={'flex-start'}>
          <Text fontSize={'xl'}>Update your details</Text>
          <FormControl mt={4}>
            <FormLabel>First Name</FormLabel>
            <Input width="sm" type="text" placeholder="Enter First Name" />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>Last Name</FormLabel>
            <Input width="sm" type="text" placeholder="Enter Last Name" />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>Email</FormLabel>
            <Input width="sm" type="email" placeholder="Enter Email" />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input width="sm" type="tel" placeholder="Enter Phone Number" />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>Old Password</FormLabel>
            <Input
              width="sm"
              type="password"
              placeholder="Enter Old Password"
            />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              width="sm"
              type="password"
              placeholder="Enter New Password"
            />
          </FormControl>

          <FormControl w={'full'} mt={4}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              width="sm"
              type="password"
              placeholder="Confirm New Password"
            />
          </FormControl>
          <Flex my={'5'}>
            <Button colorScheme="teal" mr={3}>
              Update
            </Button>
            <Button>Cancel</Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default UserSettings;

import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

const Appointments = () => {
  return (
    <Box bg={'gray.100'}>
      <Flex
        direction={'column'}
        justify={'center'}
        align={'center'}
        height={'calc(100vh - 61px)'}
      >
        <Heading fontSize={'7xl'}>Appointments</Heading>
        <Heading fontSize={'4xl'}>Comming Soon</Heading>
      </Flex>
    </Box>
  );
};

export default Appointments;

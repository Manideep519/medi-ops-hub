'use client';

import {
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      cursor={'pointer'}
      _hover={{
        bg: 'teal.600',
        color: 'white',
        border: 'none',
      }}
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.300', 'gray.900')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={'xl'} fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={'auto'} alignContent={'center'}>
          <Icon fontSize={'4xl'} as={icon} />
        </Box>
      </Flex>
    </Stat>
  );
}

export default function AdminModule() {
  return (
    <Box maxW="7xl">
      <chakra.h1 fontSize={'2xl'} pb={'5'} fontWeight={'semibold'}>
        Statistics
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={'Patients'} stat={'50'} icon={BsPerson} />
        <StatsCard title={'Doctors'} stat={'10'} icon={BsPerson} />
        <StatsCard title={'Appointments'} stat={'120'} icon={BsPerson} />
        <StatsCard title={'Nurses'} stat={'30'} icon={BsPerson} />
        <StatsCard title={'Medicines'} stat={'300'} icon={BsPerson} />
      </SimpleGrid>
    </Box>
  );
}

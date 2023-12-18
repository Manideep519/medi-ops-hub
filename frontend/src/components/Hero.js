import { Link } from 'react-router-dom';
import hero from '../assets/hero.svg';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';

const Illustration = props => {
  return (
    <Box boxSize="sm">
      <Image src={hero} alt="Doctors with reports" />
    </Box>
  );
};

export default function Home() {
  return (
    <Container maxW="container.xl">
      <Flex
        style={{ minHeight: `calc(100vh - 61px)` }}
        justify={'space-between'}
        align={'center'}
      >
        <Flex direction={'column'} flex={'2'} gap={'30px'} textAlign={'left'}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Seamless Healthcare Management for{' '}
            <Text as={'span'} color={'teal.600'}>
              Hospitals and Clinics
            </Text>
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'} maxW={'3xl'}>
            Elevate your healthcare facility with MediOpsHub. Effortlessly
            manage patients, appointments, and vital records. Simplify
            operations and enhance patient care for a more efficient,
            streamlined hospital experience.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Link to={'/login'}>
              <Button as={'div'} rounded={'full'} px={6} colorScheme={'teal'}>
                Get started
              </Button>
            </Link>
            <Button rounded={'full'} px={6}>
              Learn more
            </Button>
          </Stack>
        </Flex>
        <Flex flex={'1'} justify={'center'}>
          <Illustration
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Flex>
    </Container>
  );
}

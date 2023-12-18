'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const aboutUsData = [
  {
    id: 1,
    title: 'Comprehensive Functionality',
    text: 'Our system comprises specialized modules for administrators, patients, doctors, nurses, pharmacists, and accountants. Each module is finely tuned to cater to specific functions, ensuring a seamless healthcare management experience.',
  },
  {
    id: 2,
    title: 'Modern, Intuitive Interface',
    text: 'MediOpsHub boasts a modern, clean, and user-friendly interface, designed to elevate the overall user experience. The intuitive design makes navigation a breeze, allowing users to swiftly access the functionalities they need.',
  },
  {
    id: 3,
    title: 'Core Functionality',
    text: 'At the heart of MediOpsHub lies its ability to streamline patient management, appointment scheduling, diagnostic procedures, medication management, and financial transactions. This ensures that healthcare facilities operate with utmost precision and efficiency.',
  },
  {
    id: 4,
    title: 'Global Access to Medical Reports',
    text: "Recognizing the need for patients to access their medical reports from anywhere in the world, MediOpsHub provides a robust solution. Patients can securely retrieve their reports even when they're far from the hospital premises.",
  },
  {
    id: 5,
    title: 'Tailored Solutions for Healthcare Providers',
    text: "Whether you're a small clinic or a large multi-specialty hospital, MediOpsHub adapts to your specific needs. From inventory control to billing oversight, our software empowers healthcare providers to deliver top-notch care.",
  },
  {
    id: 6,
    title: 'Empowering the Future of Healthcare',
    text: "MediOpsHub is not just a software; it's a commitment to advancing healthcare administration. By automating tasks and providing real-time insights, we aim to elevate the standard of care and make a positive impact on the lives of patients and providers alike.",
  },
];

export default function About() {
  return (
    <Box py={100} minHeight={'100vh'}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>
          MediOpsHub: Streamlining Healthcare Operations
        </Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          MediOpsHub is an advanced Hospital Management System designed to boost
          the efficiency of healthcare facilities. It caters to hospitals,
          clinics, and healthcare providers of all sizes and specialties,
          streamlining everyday operations.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {aboutUsData.map(feature => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'start'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

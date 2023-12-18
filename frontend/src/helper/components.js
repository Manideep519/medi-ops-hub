import { Flex } from '@chakra-ui/react';

export function FlexFormContainer({ children }) {
  return (
    <Flex gap={'2'} mt={'4'}>
      {children}
    </Flex>
  );
}

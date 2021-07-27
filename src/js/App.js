import React from 'react';
import {
  ChakraProvider, Container,
} from '@chakra-ui/react';
import SearchDir from './SearchDir';
import { DropDirectory } from './DropDirectory';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <SearchDir />
      </Container>
      <DropDirectory />
    </ChakraProvider>
  );
}

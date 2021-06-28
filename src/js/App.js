import React from 'react';
import {
  Button, ChakraProvider, Container, Text,
} from '@chakra-ui/react';
import SearchDir from './SearchDir';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <SearchDir />
      </Container>
    </ChakraProvider>
  );
}

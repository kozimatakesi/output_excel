import React from 'react';
import {
  Button, ChakraProvider, Container, Text,
} from '@chakra-ui/react';
import SearchDir from './SearchDir';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <Text>You are App Component?</Text>
        <SearchDir />
      </Container>
    </ChakraProvider>
  );
}

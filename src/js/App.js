import React from 'react';
import {
  ChakraProvider, Container,
} from '@chakra-ui/react';
import SearchDir from './SearchDir';

export default function App() {
  return (
    <ChakraProvider>
      <SearchDir />
    </ChakraProvider>
  );
}

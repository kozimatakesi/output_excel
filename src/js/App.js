import React from 'react';
import { Button, ChakraProvider, Container } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <h1>You are App Component!!!</h1>
        <Button
          type="button"
          onClick={() => {
            electron.notificationApi.sendNotification('My custom notification!');
          }}
        >
          Notify

        </Button>
      </Container>
    </ChakraProvider>
  );
}

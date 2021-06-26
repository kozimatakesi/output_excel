import React from 'react';
import {
  Button, ChakraProvider, Container, Text,
} from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider>
      <Container>
        <Text>You are App Component?</Text>
        <Button
          type="button"
          onClick={() => {
            electron.notificationApi.sendNotification('My custom notification!');
          }}
        >
          notify

        </Button>
      </Container>
    </ChakraProvider>
  );
}

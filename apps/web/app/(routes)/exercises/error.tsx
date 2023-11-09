'use client';

import {useEffect} from 'react';
import {Button, Container, Title} from '@mantine/core';

interface ErrorProps {
  error: Error & {digest?: string};
  reset: () => void;
}

export default function Error({error, reset}: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Title order={2}>Something went wrong!</Title>
      <Button
        onClick={() => {
          reset();
        }}
      >
        Try again
      </Button>
    </Container>
  );
}

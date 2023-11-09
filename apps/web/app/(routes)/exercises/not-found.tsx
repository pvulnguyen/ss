import Link from 'next/link';
import {Container, Text, Title} from '@mantine/core';

export default function NotFound() {
  return (
    <Container>
      <Title order={2}>Not found!</Title>
      <Text>Could not find requested resource</Text>
      <Link href="/exercises">Return to exercises</Link>
    </Container>
  );
}

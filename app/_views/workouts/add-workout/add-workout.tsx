import {Container, Title} from '@mantine/core';
import {WorkoutForm} from '@ui/index';

export function AddWorkout() {
  return (
    <Container size="xs" my="xl" px="0">
      <Title size="h2" mb='md'>Add Workout</Title>
      <WorkoutForm />
    </Container>
  );
}

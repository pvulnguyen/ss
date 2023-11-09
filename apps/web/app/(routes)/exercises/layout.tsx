import {Box, Container, Title} from '@mantine/core';
import {getMuscleGroupNames} from '@superset/data-access-exercises';
import {TabNavigator} from '@web/exercises/components';

export default async function Layout({children}: {children: React.ReactNode}) {
  const muscleGroups = await getMuscleGroupNames();
  if (!muscleGroups) return null;

  return (
    <Container px="0" my="xl">
      <Title size="h2" mb="md">
        Exercise Library
      </Title>
      <TabNavigator items={muscleGroups} />
      <Box mb="xl">{children}</Box>
    </Container>
  );
}

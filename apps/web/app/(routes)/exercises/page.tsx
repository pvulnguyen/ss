import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Stack, Text} from '@mantine/core';
import {getPredefinedExerciseNames} from '@superset/data-access-exercises';
import {buildBasicExerciseObject} from '@superset/utils';

export default async function Page() {
  const result = await getPredefinedExerciseNames();
  if (!result) return notFound();

  const exerciseObjects = result.map((exercise) => buildBasicExerciseObject({exercise}));
  const exercises = await Promise.all(exerciseObjects);

  return (
    <Stack>
      {exercises.map(async (exercise) => (
        <Text key={exercise.id} component={Link} href={`/exercises/${exercise.id}`} tt="capitalize">
          {exercise.name}
        </Text>
      ))}
    </Stack>
  );
}

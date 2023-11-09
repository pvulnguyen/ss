import {notFound} from 'next/navigation';
import {List, ListItem} from '@mantine/core';
import {getMuscleGroupNames} from '@superset/data-access-exercises';
import prisma from '@superset/db/src/prisma';

export async function generateStaticParams() {
  const muscleGroups = await getMuscleGroupNames();
  return muscleGroups.map((muscleGroup) => ({name: muscleGroup.name}));
}

export default async function Page({params}: {params: {name: string}}) {
  const {name} = params;
  const muscleGroup = decodeURI(name);

  const exercises = await prisma.muscleGroup.findUnique({where: {name: muscleGroup}}).bases();
  if (!exercises) return notFound();

  return (
    <List listStyleType="none">
      {exercises.map((exercise) => (
        <ListItem key={exercise.id} tt="capitalize">
          {exercise.name}
        </ListItem>
      ))}
    </List>
  );
}

import {notFound} from 'next/navigation';
import {Title} from '@mantine/core';
import prisma from '@superset/db/src/prisma';

export default async function Page({params}: {params: {id: string}}) {
  const exercise = await prisma.predefinedExercise.findUnique({
    where: {id: params.id},
    select: {
      base: {
        select: {
          name: true,
          muscleGroups: {
            select: {
              name: true,
            },
          },
        },
      },
      modifier: {
        select: {
          name: true,
        },
      },
      equipment: {
        select: {
          name: true,
        },
      },
      position: {
        select: {
          name: true,
        },
      },
      primaryTarget: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!exercise) return notFound();

  return (
    <Title order={3} tt="capitalize">
      {exercise.base.name}
    </Title>
  );
}

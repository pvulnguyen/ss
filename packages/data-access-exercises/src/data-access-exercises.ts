import prisma from '@superset/db/src/prisma';

export interface PredefinedExerciseNameRaw {
  id: string;
  base: {name: string};
  position: {name: string} | null;
  modifier: {name: string} | null;
  equipment: {name: string} | null;
}

export async function getPredefinedExerciseNames() {
  return prisma.predefinedExercise.findMany({
    select: {
      id: true,
      base: {
        select: {
          name: true,
        },
      },
      position: {
        select: {
          name: true,
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
    },
  });
}

export async function getPredefinedExerciseNamesByMuscleGroup(name: string) {
  return prisma.muscleGroup.findUnique({where: {name}}).predefinedExercises({
    select: {
      id: true,
      base: {
        select: {
          name: true,
        },
      },
      position: {
        select: {
          name: true,
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
    },
  });
}

export async function getPredefinedExercise(id: string) {
  return prisma.predefinedExercise.findUnique({
    where: {id},
    include: {
      base: true,
      position: true,
      modifier: true,
      equipment: true,
      primaryTarget: true,
    },
  });
}

export async function getMuscleGroupNames() {
  return prisma.muscleGroup.findMany({
    select: {name: true},
  });
}

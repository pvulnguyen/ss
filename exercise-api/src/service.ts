import { Exercise, MuscleGroup, Split } from '@prisma/client';

import { prisma } from '../prisma-client';

export async function getExercises(): Promise<Exercise[]> {
    return await prisma.exercise.findMany();
}

export async function getExercisesByMuscleGroup(id: number): Promise<(MuscleGroup & { exercises: Exercise[] }) | null> {
    return await prisma.muscleGroup.findUnique({ where: { id }, include: { exercises: true } });
}

export async function getExercise(id: number): Promise<Exercise | null> {
    return await prisma.exercise.findUnique({ where: { id } });
}

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
    return await prisma.muscleGroup.findMany();
}

export async function getMuscleGroup(id: number): Promise<MuscleGroup | null> {
    return await prisma.muscleGroup.findUnique({ where: { id } });
}

export async function getExercisesBySplit(split: string): Promise<Exercise[]> {
    return await prisma.exercise.findMany({ where: { split: split as Split } });
}

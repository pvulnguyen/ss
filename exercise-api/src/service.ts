import { prisma } from '../prisma-client';
import type { Exercise, MuscleGroup, Split } from '@prisma/client';

export async function getExercises(): Promise<Exercise[]> {
    return prisma.exercise.findMany();
}

export async function getExercisesByMuscleGroup(id: number): Promise<(MuscleGroup & { exercises: Exercise[] }) | null> {
    return prisma.muscleGroup.findUnique({ where: { id }, include: { exercises: true } });
}

export async function getExercise(id: number): Promise<Exercise | null> {
    return prisma.exercise.findUnique({ where: { id } });
}

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
    return prisma.muscleGroup.findMany();
}

export async function getMuscleGroup(id: number): Promise<MuscleGroup | null> {
    return prisma.muscleGroup.findUnique({ where: { id } });
}

export async function getExercisesBySplit(split: string): Promise<Exercise[]> {
    return prisma.exercise.findMany({ where: { split: split as Split } });
}

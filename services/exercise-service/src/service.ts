import { Exercise, MuscleGroup, Split } from '@prisma/client';

import { NotFoundError } from './exceptions';
import { prisma } from '../prisma-client';

export async function getExercises(): Promise<Exercise[]> {
    try {
        return await prisma.exercise.findMany();
    } catch (error) {
        throw new NotFoundError('Failed to fetch exercises.');
    }
}

export async function getExercisesByMuscleGroup(id: number): Promise<(MuscleGroup & { exercises: Exercise[] }) | null> {
    try {
        return await prisma.muscleGroup.findUnique({
            where: { id },
            include: { exercises: true },
        });
    } catch (error) {
        throw new NotFoundError(`Failed to fetch muscle group with ID ${id}.`);
    }
}

export async function getExercise(id: number): Promise<Exercise | null> {
    try {
        return await prisma.exercise.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new NotFoundError(`Failed to fetch exercise with ID ${id}.`);
    }
}

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
    try {
        return await prisma.muscleGroup.findMany();
    } catch (error) {
        throw new NotFoundError('Failed to fetch muscle groups.');
    }
}

export async function getMuscleGroup(id: number): Promise<MuscleGroup | null> {
    try {
        return await prisma.muscleGroup.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new NotFoundError(`Failed to fetch muscle group with ID ${id}.`);
    }
}

export async function getExercisesBySplit(split: string): Promise<Exercise[]> {
    try {
        return await prisma.exercise.findMany({
            where: { split: split as Split },
        });
    } catch (error) {
        throw new NotFoundError(`Failed to fetch exercises for split ${split}.`);
    }
}

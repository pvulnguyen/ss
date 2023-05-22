import express from 'express';

import { NotFoundError } from './exceptions/not-found';
import { asyncHandler } from './middleware';
import * as service from './service';

export const router: express.Router = express.Router();

router.get(
    '/exercises',
    asyncHandler(async (_, res) => {
        const exercises = await service.getExercises();
        res.status(200).send(exercises);
    }),
);

router.get(
    '/exercises/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const exerciseId = Number(id);
        const exercise = await service.getExercise(exerciseId);
        if (!exercise) throw new NotFoundError('Exercise not found.');
        res.status(200).send(exercise);
    }),
);

router.get(
    '/exercises/splits/:split',
    asyncHandler(async (req, res) => {
        const { split } = req.params;
        const exercisesBySplit = await service.getExercisesBySplit(split);
        res.status(200).send(exercisesBySplit);
    }),
);

router.get(
    '/muscle_groups',
    asyncHandler(async (_, res) => {
        const muscleGroups = await service.getMuscleGroups();
        res.status(200).send(muscleGroups);
    }),
);

router.get(
    '/muscle_groups/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const muscleGroupId = Number(id);
        const muscleGroup = await service.getMuscleGroup(muscleGroupId);
        res.status(200).send(muscleGroup);
    }),
);

router.get(
    '/muscle_groups/:id/exercises',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const muscleGroupId = Number(id);
        const exercisesByMuscleGroup = await service.getExercisesByMuscleGroup(muscleGroupId);
        res.status(200).send(exercisesByMuscleGroup);
    }),
);

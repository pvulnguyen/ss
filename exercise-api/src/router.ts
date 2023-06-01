import express from 'express';

import { asyncHandler } from './middleware';
import * as service from './service';

export const router: express.Router = express.Router();

router.get('/exercises', asyncHandler(async (_, res, next) => {
    const exercises = await service.getExercises();
    
    res.status(200).send(exercises);
}));

router.get('/exercises/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const exercise = await service.getExercise(Number(id));
    if (!exercise) throw new Error(`Exercise with ID ${id} not found.`);

    res.status(200).send(exercise);
}));

router.get('/exercises/splits/:split', asyncHandler(async (req, res, next) => {
    const { split } = req.params;

    const exercises = await service.getExercisesBySplit(split);
    if (!exercises) throw new Error(`${split} not found.`);

    res.status(200).send(exercises);
}));

router.get('/muscle_groups', asyncHandler(async (_, res, next) => {
    const muscleGroups = await service.getMuscleGroups();

    res.status(200).send(muscleGroups);
}));

router.get('/muscle_groups/:id', asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const muscleGroup = await service.getMuscleGroup(Number(id));
    if (!muscleGroup) throw new Error(`Muscle group with ID ${id} not found.`);

    res.status(200).send(muscleGroup);

}));

router.get('/muscle_groups/:id/exercises', asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const exercises = await service.getExercisesByMuscleGroup(Number(id));
    if (!exercises) throw new Error(`Muscle group with ID ${id} not found.`);

    res.status(200).send(exercises);
}));

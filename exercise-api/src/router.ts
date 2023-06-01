import express from 'express';
import * as service from './service';

import type { Request, Response, Router } from 'express';

export const router: Router = express.Router();

router.get('/exercises', async (_, res: Response) => {
    const exercises = await service.getExercises();

    res.status(200).send(exercises);
});

router.get('/exercises/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const exercise = await service.getExercise(Number(id));
    if (!exercise) throw new Error(`Exercise with ID ${id} not found.`);

    res.status(200).send(exercise);
});

router.get('/exercises/splits/:split', async (req: Request, res: Response) => {
    const { split } = req.params;

    const exercises = await service.getExercisesBySplit(split);
    if (!exercises) throw new Error(`${split} not found.`);

    res.status(200).send(exercises);
});

router.get('/muscle_groups', async (req: Request, res: Response) => {
    const muscleGroups = await service.getMuscleGroups();

    res.status(200).send(muscleGroups);
});

router.get('/muscle_groups/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const muscleGroup = await service.getMuscleGroup(Number(id));
    if (!muscleGroup) throw new Error(`Muscle group with ID ${id} not found.`);

    res.status(200).send(muscleGroup);
});

router.get('/muscle_groups/:id/exercises', async (req: Request, res: Response) => {
    const { id } = req.params;

    const exercises = await service.getExercisesByMuscleGroup(Number(id));
    if (!exercises) throw new Error(`Muscle group with ID ${id} not found.`);

    res.status(200).send(exercises);
});

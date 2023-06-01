import express from 'express';
import type { Router } from 'express';

import { asyncHandler } from '../middleware';
import * as service from './service';
import type { Workout } from './workout';

export const router: Router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/users', asyncHandler(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).send('Unauthorized');

    const workouts = await service.getAllWorkouts(userId);
    if (!workouts) throw new Error(`Failed to find workouts for user with ID ${userId}`);

    res.status(200).send(workouts);
}));

router.get('/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const workout = await service.getWorkoutById(id);
    if (!workout) throw new Error(`Failed to find workout with ID ${id}`);

    res.status(200).send(workout);
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const workout: Workout = req.body;

    const result = await service.insertWorkout(workout);
    if (!result?.acknowledged) throw new Error('Failed to save workout entry.');

    res.status(201).send(`Created new workout entry: ${result.insertedId}`);
}));

router.delete('/:id', asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const userId = req.user?.id;
    if (!userId) throw new Error('Unauthorized.');

    const deletionResult = await service.deleteWorkout(id, userId);
    if (deletionResult?.statusCode === 202) {
        return res.status(202).send(deletionResult.message);
    } else if (deletionResult?.statusCode === 404) {
        return res.status(404).send(deletionResult.message);
    } else if (deletionResult?.statusCode === 403) {
        return res.status(403).send(deletionResult.message);
    }

    res.status(400).send(deletionResult?.message);
}));

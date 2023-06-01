import { ObjectId } from 'mongodb';
import { collections } from '../database';

import type { Workout } from './workout';

/** Retrieves all workouts for the specified user. */
export async function getAllWorkouts(userId: string) {
    return collections.workouts?.find({ userId }).toArray();
}

/** Retrieves a workout by its ID. */
export async function getWorkoutById(id: string) {
    const query = { _id: new ObjectId(id) };
    return collections.workouts?.findOne(query);
}

/** Inserts a new workout into the database. */
export async function insertWorkout(workout: Workout) {
    for (const workoutItem of workout.workoutItems) {
        for (const set of workoutItem.sets) {
            if (set.weight === '') set.weight = 0;
            if (set.reps   === '') set.reps   = 0;
        }
    }

    const result = await collections.workouts?.insertOne(workout);

    return result;
}

/** Updates a workout by replacing the entire document. */
export async function updateWorkout(id: string, workout: Workout) {
    const originalWorkout = await getWorkoutById(id);
    if (!originalWorkout) throw new Error(`Failed to find workout with ID ${id}.`);

    const resultFromUpdate = await collections.workouts?.replaceOne({ _id: new ObjectId(id) }, workout);
    if (!resultFromUpdate?.acknowledged) throw new Error(`Failed to update workout with ID ${id}`);

    return resultFromUpdate;
}

/** Deletes a workout by its ID, only if the user is authorized. */
export async function deleteWorkout(id: string, userId: string) {
    const workout = await getWorkoutById(id);
    if (!workout) throw new Error(`Failed to find workout with ID ${id}.`);

    if (workout.userId !== userId) throw new Error('You are not authorized to delete this workout.');

    const result = await collections.workouts?.deleteOne({ _id: new ObjectId(id) });
    if (!result?.deletedCount) throw new Error(`Failed to remove workout with ID ${id}.`);

    return { statusCode: 202, message: `Removed workout: ${id}` };
}

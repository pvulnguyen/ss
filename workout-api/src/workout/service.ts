import { ObjectId } from 'mongodb';
import { collections } from '../database';
import type { Workout } from './workout';

const workoutsCollection = collections.workouts;

export async function getAllWorkouts(userId: string) {
    try {
        return await workoutsCollection?.find({ userId }).toArray();
    } catch (error) {
        throw new Error(`Failed to find workouts for user with ID ${userId}.`);
    }
}

export async function getWorkoutById(id: string) {
    try {
        const query = { _id: new ObjectId(id) };
        return await workoutsCollection?.findOne(query);
    } catch (error) {
        throw new Error(`Failed to find workout with ID ${id}.`);
    }
}

export async function insertWorkout(workout: Workout) {
    try {
        return await workoutsCollection?.insertOne(workout);
    } catch (error) {
        throw new Error('Failed to save workout to database.');
    }
}

export async function deleteWorkout(id: string, userId: string) {
    try {
        const workout = await getWorkoutById(id);
        if (!workout) return { statusCode: 404, message: `Failed to find workout: ${id}` };

        if (workout.userId !== userId) {
            return { statusCode: 403, message: 'You are not authorized to delete this workout.' };
        } else {
            const query = { _id: new ObjectId(id) };
            const result = await workoutsCollection?.deleteOne(query);
            if (result && result.deletedCount) {
                return { statusCode: 202, message: `Removed workout: ${id}` };
            } else if (!result) {
                return { statusCode: 400, message: `Failed to remove workout with ID ${id}` };
            } else if (!result.deletedCount) {
                return { statusCode: 404, message: `Failed to find workout with ID ${id}` };
            }
        }
    } catch (error) {
        throw new Error(`Failed to delete workout with ID ${id}`);
    }
}

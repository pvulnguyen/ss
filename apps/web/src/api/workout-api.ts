import { sendRequest } from './api';
import type { WorkoutFormValues } from '#/router/routes/workouts/add-workout';

const baseUrl: string = import.meta.env.VITE_WORKOUT_API_URL;

export interface WorkoutResponse {
    _id: string;
    userId: string;
    createdAt: Date;
    workoutItems: {
        id: string;
        exercise: string;
        sets: { id: string; weight: string | number; reps: string | number }[];
    }[];
};

export async function createWorkout(token: string, workout: WorkoutFormValues): Promise<WorkoutResponse> {
    const url = `${baseUrl}/workouts`;
    return await sendRequest<WorkoutResponse>(url, token, 'POST', workout);
}

export async function fetchWorkouts(token: string, userId: string): Promise<WorkoutResponse[]> {
    const url = `${baseUrl}/workouts/users`;
    return await sendRequest<WorkoutResponse[]>(url, token, 'GET');
}

export async function fetchWorkout(token: string, id: string): Promise<WorkoutResponse> {
    const url = `${baseUrl}/workouts/${id}`;
    return await sendRequest<WorkoutResponse>(url, token, 'GET');
}

export async function deleteWorkout(token: string, id: string): Promise<void> {
    const url = `${baseUrl}/workouts/${id}`;
    await sendRequest<void>(url, token, 'DELETE');
}

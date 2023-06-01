import type { ObjectId } from 'mongodb';

export interface Workout {
    userId: string;
    createdAt: Date;
    workoutItems: WorkoutItem[];
    _id?: ObjectId;
}

interface WorkoutItem {
    id: string;
    exercise: string;
    sets: Set[];
}

interface Set {
    id?: string;
    weight: number | string;
    reps: number | string;
}

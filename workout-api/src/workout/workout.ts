import type { ObjectId } from 'mongodb';

export interface Workout {
    userId: string;
    createdAt: Date;
    workoutItems: WorkoutItem[];
    _id?: ObjectId;
}

interface WorkoutItem {
    exercise: string;
    sets: Set[];
    id?: string;
}

interface Set {
    weight: number;
    reps: number;
    id?: string;
}

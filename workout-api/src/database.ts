import { MongoClient, MongoServerError } from 'mongodb';

import type { Collection, Db } from 'mongodb';
import type { Workout } from './workout';

export const collections: { workouts?: Collection<Workout> } = {};

export async function connectToDatabase(uri: string) {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('workout_service');
    await applySchemaValidation(db);

    const workoutsCollection = db.collection<Workout>('workouts');
    collections.workouts = workoutsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${workoutsCollection.collectionName}`);
}

async function applySchemaValidation(db: Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: ['userId', 'createdAt', 'workoutItems'],
            additionalProperties: false,
            properties: {
                _id: {},
                userId   : { bsonType: 'string', description: '"userId" is required.'  },
                createdAt: { bsonType: 'date', description: '"createdAt" is required.' },
                workoutItems: {
                    bsonType: 'array',
                    minItems: 1,
                    additionalProperties: false,
                    items: {
                        bsonType: 'object',
                        required: ['id', 'exercise'],
                        additionalProperties: false,
                        properties: {
                            id      : { bsonType: 'string', description: '"id" is required.'       },
                            exercise: { bsonType: 'string', description: '"exercise" is required.' },
                        },
                        sets: {
                            bsonType: 'array',
                            minItems: 1,
                            items: {
                                bsonType: 'object',
                                required: ['weight', 'reps'],
                                properties: {
                                    id    : { bsonType: 'string', description: '"id" is required.'     },
                                    weight: { bsonType: 'number', description: '"weight" is required.' },
                                    reps  : { bsonType: 'number', description: '"reps" is required.'   },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    try {
        await db.command({ collMod: 'workouts', validator: jsonSchema });
    } catch (error) {
        if (error instanceof MongoServerError && error.codeName === 'NamespaceNotFound') {
            await db.createCollection('workouts', { validator: jsonSchema });
        }
    }
}

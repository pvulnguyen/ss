import React from 'react';

import { ActionIcon, Alert, Button, Flex, LoadingOverlay, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash } from '@phosphor-icons/react';
import { IconAlertCircle } from '@tabler/icons-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';

import { fetchExercises, type Exercise } from '#/api/exercise-api';
import { createWorkout } from '#/api/workout-api';
import { Title } from '#/components';
import { useAuth } from '#/hooks';
import { SelectExercise } from './components/select-exercise';
import { WorkoutItemSet } from './components/workout-item-set';

export interface WorkoutFormValues {
    userId: string;
    createdAt: Date;
    workoutItems: {
        id: string;
        exercise: string;
        sets: { id: string; weight: string | number; reps: string | number }[];
    }[];
};

export function AddWorkout() {
    const { session } = useAuth();
    const token = session?.access_token;

    const [isLoading, setLoading  ] = React.useState(true);
    const [exercises, setExercises] = React.useState<Exercise[]>([]);
    React.useEffect(() => {
        async function loadExercises() {
            try {
                const data = await fetchExercises(token!);
                setExercises(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadExercises();
    }, []);

    const workoutForm = useForm<WorkoutFormValues>({
        initialValues: {
            userId: session!.user.id,
            createdAt: new Date(),
            workoutItems: [
                {
                    id: randomId(),
                    exercise: '',
                    sets: [{ id: randomId(), weight: '', reps: '' }],
                },
            ],
        },
    });

    function addSet(index: number) {
        workoutForm.insertListItem(`workoutItems.${index}.sets`, {
            id: randomId(),
            weight: '',
            reps: '',
        });
    }

    function addExercise() {
        workoutForm.insertListItem('workoutItems', {
            id: randomId(),
            exercise: '',
            sets: [{ id: randomId(), weight: '', reps: '' }],
        });
    }

    function deleteExercise(index: number) {
        workoutForm.removeListItem('workoutItems', index);
    }

    const navigate = useNavigate();
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setSubmitting] = React.useState(false);
    async function saveToDb(values: WorkoutFormValues) {
        try {
            setSubmitting(true);
            await createWorkout(token!, values);
            navigate('/workouts');
        } catch (error) {
            if (error instanceof Error) setError(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const fields = workoutForm.values.workoutItems?.map((item, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Paper withBorder shadow='md' p={24} mb={32}>
                        <Stack>
                            <Flex gap={16} align='center'>
                                <SelectExercise data={exercises} workoutForm={workoutForm} index={index} />

                                <ActionIcon variant='red' onClick={() => deleteExercise(index)}>
                                    <Trash />
                                </ActionIcon>
                            </Flex>

                            <Button variant='gray' onClick={() => addSet(index)}>
                                Add Set
                            </Button>

                            {item.sets.map((set, setIndex) => (
                                <Flex key={set.id} gap={16} align='center'>
                                    <WorkoutItemSet form={workoutForm} index={index} setIndex={setIndex} />
                                </Flex>
                            ))}
                        </Stack>
                    </Paper>
                </div>
            )}
        </Draggable>
    ));

    return (
        <>
            <Title title='Add Workout' />

            <LoadingOverlay visible={isSubmitting} overlayBlur={2} />

            {error && (<Alert icon={<IconAlertCircle />}>{error}</Alert>)}

            <form onSubmit={workoutForm.onSubmit((values) => saveToDb(values))}>
                <DragDropContext
                    onDragEnd={({ destination, source }) => (
                        workoutForm.reorderListItem('workoutItems', { from: source.index, to: destination!.index })
                    )}
                >
                    <Droppable droppableId='dnd-list' direction='vertical'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {fields || null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Button variant='orange' onClick={addExercise}>
                    Add Exercise
                </Button>

                <Button variant='green' type='submit' mt={32}>
                    Finish
                </Button>
            </form>
        </>
    );
}

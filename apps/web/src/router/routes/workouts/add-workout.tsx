import React from 'react';

import { ActionIcon, Button, Flex, LoadingOverlay, Paper, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash } from '@phosphor-icons/react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { fetchExercises } from '#/api/exercise-api';
import { createWorkout } from '#/api/workout-api';
import { Title } from '#/components';
import { useAuth } from '#/hooks';
import { SelectExercise } from './components/select-exercise';
import { WorkoutItemSet } from './components/workout-item-set';
import type { Exercise } from '#/api/exercise-api';

export type WorkoutFormValues = {
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
    
    const [isLoading, setLoading] = React.useState(true);
    const [exercises, setExercises] = React.useState<Exercise[]>([]);

    React.useEffect(() => {
        async function loadExercises() {
            try {
                const data = await fetchExercises(session!.access_token);
                setExercises(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
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

    function saveToDb(values: WorkoutFormValues) {
        setLoading(true);
        createWorkout(session!.access_token, values);
        setLoading(false);
    }

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

            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            <form onSubmit={workoutForm.onSubmit((values) => saveToDb(values))}>
                <DragDropContext
                    onDragEnd={({ destination, source }) =>
                        workoutForm.reorderListItem('workoutItems', { from: source.index, to: destination!.index })
                    }
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

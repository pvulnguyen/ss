import React from 'react';

import { Button, Divider, Flex, Group, LoadingOverlay, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';

import { deleteWorkout, fetchWorkout, type WorkoutResponse } from '#/api/workout-api';
import { Title } from '#/components';
import { useAuth } from '#/hooks';

export function Workout() {
    const { session } = useAuth();
    const { workoutId } = useParams();

    const [isLoading, setLoading] = React.useState(true);
    const [workout, setWorkout] = React.useState<WorkoutResponse | null>(null);

    React.useEffect(() => {
        async function loadWorkout() {
            try {
                const data = await fetchWorkout(session!.access_token, workoutId!);
                setWorkout(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadWorkout();
    }, []);

    const navigate = useNavigate();
    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await deleteWorkout(session!.access_token, workoutId!);
            navigate('/workouts');
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack>
            <Title
                title={new Date(workout?.createdAt!).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                })}
            />

            <LoadingOverlay pos='relative' visible={isLoading} />

            <Group grow w='100%'>
                <Button variant='orange' type='button'>
                    Edit
                </Button>
                <Button variant='red' type='button' onClick={handleDelete}>
                    Delete
                </Button>
            </Group>

            <Paper withBorder shadow='md' p={24}>
                <Stack>
                    {workout?.workoutItems.map((item) => (
                        <Stack>
                            <Divider
                                my='xs'
                                labelPosition='center'
                                label={<Text tt='capitalize'>{item.exercise}</Text>}
                            />

                            {item.sets.map((set) => (
                                <Flex key={set.id} gap={16} align='center'>
                                    <TextInput defaultValue={`${Number(set.weight)} lbs`} disabled />
                                    <TextInput defaultValue={`${Number(set.reps)} reps`} disabled />
                                </Flex>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Paper>
        </Stack>
    );
}

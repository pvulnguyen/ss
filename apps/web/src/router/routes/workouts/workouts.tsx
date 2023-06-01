import React from 'react';
import { Link } from 'react-router-dom';
import { Center, Divider, Flex, Loader, Title as MTitle, Paper, Stack, Text } from '@mantine/core';

import { fetchWorkouts } from '#/api/workout-api';
import { Title } from '#/components';
import { useAuth } from '#/hooks';
import type { WorkoutResponse } from '#/api/workout-api';

export function Workouts() {
    const { session } = useAuth();
    
    const [isLoading, setLoading] = React.useState(false);
    const [workouts, setWorkouts] = React.useState<WorkoutResponse[]>([]);

    React.useEffect(() => {
        async function loadWorkouts() {
            try {
                setLoading(true);
                const data = await fetchWorkouts(session!.access_token, session!.user.id);
                setWorkouts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadWorkouts();
    }, []);

    const totalVolume = workouts?.reduce(
        (accumulator, workout) =>
            accumulator +
            workout.workoutItems.reduce(
                (itemAccumulator, item) =>
                    itemAccumulator + item.sets.reduce((setAccumulator, set) => setAccumulator + Number(set.weight), 0),
                0,
            ),
        0,
    );

    return (
        <Stack>
            <Title title='Workouts' />

            {isLoading ? (
                <Center>
                    <Loader />
                </Center>
            ) : (
                workouts?.map((workout) => (
                    <Paper
                        component={Link}
                        to={`/workouts/${workout._id}`}
                        key={workout._id}
                        shadow='md'
                        w='100%'
                        withBorder
                    >
                        <Stack p={32}>
                            <MTitle order={3} ta='center'>
                                {new Date(workout.createdAt).toLocaleDateString('en-us', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </MTitle>
                            <Flex justify='space-around'>
                                <Text>Exercises: {workout.workoutItems.length}</Text>
                                <Divider orientation='vertical' />
                                <Text>Volume: {totalVolume} lbs</Text>
                            </Flex>
                        </Stack>
                    </Paper>
                ))
            )}
        </Stack>
    );
}

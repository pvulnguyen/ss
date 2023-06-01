import React from 'react';

import { Button, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, Navigate } from 'react-router-dom';

import { Title } from '#/components';
import { useAuth } from '#/hooks';
import type { UserCredentials } from '#/context/auth-context';

export function SignIn() {
    const { session, signIn } = useAuth();
    if (session) return <Navigate to='/' />;

    const form = useForm({
        initialValues: { email: '', password: '' },
        validate: { email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email') },
    });

    const [isLoading, setLoading] = React.useState(false);
    async function handleSignIn(values: UserCredentials) {
        try {
            setLoading(true);
            await signIn(values);
        } catch (error) {
            //
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack mih='100vh' justify='center' p={32}>
            <Title title='Sign In' />

            <Paper withBorder shadow='md' p={16} w='100%' component='form' onSubmit={form.onSubmit(handleSignIn)}>
                <Stack>
                    <TextInput
                        required
                        type='email'
                        label='Email'
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        required
                        type='password'
                        label='Password'
                        {...form.getInputProps('password')}
                    />

                    <Text component={Link} to='/sign-up' ta='center'>
                        Don't have an account?
                    </Text>

                    <Button
                        variant='orange'
                        type='submit'
                        loaderPosition='left'
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In..' : 'Sign In'}
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}

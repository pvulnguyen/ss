import React from 'react';

import { Alert, Button, Paper, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { Link, Navigate } from 'react-router-dom';

import { Title } from '#/components';
import { useAuth } from '#/hooks';
import type { UserCredentials } from '#/context/auth-context';

interface Values extends UserCredentials {
    confirmPassword: string;
}

export function SignUp() {
    const { session, signUp } = useAuth();
    if (session) return <Navigate to='/' />;

    const form = useForm({
        initialValues: { email: '', password: '', confirmPassword: '' },
        validate: { email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email') },
    });

    const [isMatching, setMatching] = React.useState(false);
    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const confirmPassword = e.currentTarget.value;
        const password = form.values.password;
        setMatching(password === confirmPassword);
    }

    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setLoading] = React.useState(false);
    async function handleSignUp(values: Values) {
        try {
            setLoading(true);
            const { confirmPassword, ...credentials } = values;
            await signUp(credentials);
        } catch (error) {
            if (error instanceof Error) setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Stack mih='100vh' justify='center' p={32}>
            <Title title='Sign Up' />

            <Paper withBorder shadow='md' component='form' p={16} w='100%' onSubmit={form.onSubmit(handleSignUp)}>
                <Stack>
                    {error && (<Alert icon={<IconAlertCircleFilled />} color='red' >{error}</Alert>)}
                    
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

                    <PasswordInput
                        required
                        type='password'
                        label='Confirm Password'
                        onChange={handleConfirmPasswordChange}
                    />

                    <Text component={Link} to='/sign-in' ta='center'>
                        Already have an account?
                    </Text>

                    <Button
                        variant='orange'
                        type='submit'
                        loaderPosition='left'
                        loading={isLoading}
                        disabled={isLoading || !isMatching}
                    >
                        {isLoading ? 'Creating Account..' : 'Create Account'}
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}

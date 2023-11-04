'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {toast} from 'react-toastify';

import {PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';

import {SubmitButton} from '../submit-button';

export function SignUpForm() {
  const [isPending, setPending] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      username: (value) =>
        value.length < 4 ? 'Usernames should contain atleast 4 characters.' : null,
      password: (value) =>
        value.length < 8 ? 'Passwords should contain atleast 8 characters' : null,
      passwordConfirmation: (value, values) => {
        if (value !== values.password) return 'Passwords do not match';
        return null;
      },
    },
  });

  const router = useRouter();
  const handleSubmit = form.onSubmit(async (values) => {
    setPending(true);
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });
    setPending(false);
    if (!response.ok) {
      const {error} = await response.json();
      toast.error(error);
    } else {
      toast.success('Your account has been created. Redirecting you to the sign in page.');
      form.reset();
      router.push('/sign-in');
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        placeholder="Username"
        error={form.errors.username}
        {...form.getInputProps('username')}
      />
      <PasswordInput
        label="Password"
        placeholder="Password"
        mt="xs"
        error={form.errors.password}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm Password"
        mt="xs"
        error={form.errors.passwordConfirmation}
        {...form.getInputProps('passwordConfirmation')}
      />
      <SubmitButton label="Create Account" mt="xl" pending={isPending} fullWidth />
    </form>
  );
}

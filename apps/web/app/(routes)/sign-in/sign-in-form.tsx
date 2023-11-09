'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {toast} from 'react-toastify';
import {PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {SubmitButton} from '@web/components';

export function SignInForm() {
  const [isPending, setPending] = useState(false);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) =>
        value.length < 4 ? 'Usernames should contain atleast 4 characters.' : null,
      password: (value) =>
        value.length < 8 ? 'Passwords should contain atleast 8 characters' : null,
    },
  });

  const router = useRouter();
  const handleSubmit = form.onSubmit(async (values) => {
    setPending(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values),
    });
    setPending(false);
    if (!response.ok) {
      const {error} = await response.json();
      toast.error(error);
    } else {
      form.reset();
      router.push('/');
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
      <SubmitButton label="Log In" mt="md" pending={isPending} fullWidth />
    </form>
  );
}

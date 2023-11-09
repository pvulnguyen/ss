import {Center, Paper, Title} from '@mantine/core';
import {SignInForm} from './sign-in-form';

export function SignIn() {
  return (
    <Center pt="8rem">
      <Paper p="md" w={{base: '100%', xs: '390px'}} withBorder>
        <Title ta="center">Sign In</Title>
        <SignInForm />
      </Paper>
    </Center>
  );
}

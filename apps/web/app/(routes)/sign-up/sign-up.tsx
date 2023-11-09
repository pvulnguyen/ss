import {Center, Paper, Title} from '@mantine/core';
import {SignUpForm} from './sign-up-form';

export function SignUp() {
  return (
    <Center pt="8rem">
      <Paper p="md" w={{base: '100%', xs: '390px'}} withBorder>
        <Title ta="center">Sign In</Title>
        <SignUpForm />
      </Paper>
    </Center>
  );
}

import {Center, Paper, Title} from '@mantine/core';

interface ContainerProps {
  type: 'sign-in' | 'sign-up';
  children: React.ReactNode;
}

export function Container({type, children}: ContainerProps) {
  return (
    <Center pt="8rem">
      <Paper p="md" w={{base: '100%', xs: '390px'}} withBorder>
        <Title ta="center">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</Title>
        {children}
      </Paper>
    </Center>
  );
}

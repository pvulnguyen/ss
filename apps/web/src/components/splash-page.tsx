import { Stack, Title } from '@mantine/core';
import { ButtonLink } from './button-link';

export function SplashPage() {
    return (
        <Stack w='100%' maw={500} mih='100vh' justify='center' p={32}>
            <Title align='center' pb={16}>SuperSet</Title>
            <ButtonLink to='/sign-in' label='Sign In' variant='orange' />
            <ButtonLink to='/sign-up' label='Sign Up' variant='gray' />
        </Stack>
    );
}

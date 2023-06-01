import { Container, Stack } from '@mantine/core';

export function AppContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container h='100%'>
            <Stack mih='100vh' align='center' justify='space-between' p={0}>
                {children}
            </Stack>
        </Container>
    );
}

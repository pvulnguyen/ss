import { Loader as MLoader } from '@mantine/core';
import { AppContainer } from './app-container';

export function Loader() {
    return (
        <AppContainer>
            <MLoader />
        </AppContainer>
    );
}

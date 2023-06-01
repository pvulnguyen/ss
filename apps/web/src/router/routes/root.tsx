import { Center } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { AppBar, AppContainer, Loader, SplashPage } from '#/components';
import { useAuth } from '#/hooks';

export function Root() {
    const { loading, session } = useAuth();

    switch (true) {
        case loading:
            return <Loader />;
        case !session:
            return (
                <Center>
                    <SplashPage />
                </Center>
            );
        default:
            return (
                <AppContainer>
                    <Outlet />
                    <AppBar />
                </AppContainer>
            );
    }
}

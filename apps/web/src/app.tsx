import { MantineProvider } from '@mantine/core';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context';
import { router } from './router';
import { theme } from './theme';

export function App() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>SuperSet</title>
            </Helmet>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </MantineProvider>
        </HelmetProvider>
    );
}

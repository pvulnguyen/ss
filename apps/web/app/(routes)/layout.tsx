import '@mantine/core/styles.css';
import '@web/config/theme/global.css';
import 'react-toastify/ReactToastify.css';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {AppFrame} from '@web/components';
import {fonts, theme} from '@web/config';
import {ToastContainer} from 'react-toastify';

export const metadata = {
  title: {
    default: 'SuperSet',
    template: '%s - SuperSet',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={fonts.teko.variable}>
        <MantineProvider theme={theme}>
          <AppFrame>{children}</AppFrame>
        </MantineProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

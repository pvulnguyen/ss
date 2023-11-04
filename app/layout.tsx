import '@mantine/core/styles.css';
import 'react-toastify/ReactToastify.css';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Teko} from 'next/font/google';
import {ToastContainer} from 'react-toastify';
import {AppFrame} from '@ui/index';

const teko = Teko({subsets: ['latin'], variable: '--font-teko'});

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
      <body className={teko.variable}>
        <MantineProvider theme={{black: '#333333'}}>
          <AppFrame>{children}</AppFrame>
        </MantineProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

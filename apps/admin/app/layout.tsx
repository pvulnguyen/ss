import '@superset/ui/styles/basic.css';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    default: 'SuperSet Admin',
    template: '%s - SuperSet Admin',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

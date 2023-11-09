'use client';

import {AppShell} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {AppFrameHeader} from './app-frame-header';
import {AppFrameNavBar} from './app-frame-nav-bar';

export function AppFrame({children}: {children: React.ReactNode}) {
  const [opened, {close, toggle}] = useDisclosure();

  return (
    <AppShell
      header={{height: 48}}
      navbar={{width: 300, breakpoint: 'sm', collapsed: {desktop: true, mobile: !opened}}}
      px={{base: 'xs', sm: 'sm', md: 'lg'}}
    >
      <AppFrameHeader opened={opened} toggle={toggle} />
      <AppFrameNavBar onLinkClick={close} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

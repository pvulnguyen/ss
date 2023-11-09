import Link from 'next/link';
import {AppShellNavbar, Text} from '@mantine/core';

export function AppFrameNavBar({onLinkClick}: {onLinkClick: () => void}) {
  return (
    <AppShellNavbar p="md">
      <Text component={Link} href="/" fz="1.25rem" fw="600" onClick={onLinkClick}>
        Home
      </Text>
      <Text component={Link} href="/exercises" fz="1.25rem" fw="600" onClick={onLinkClick}>
        Exercises
      </Text>
      <Text component={Link} href="/workouts" fz="1.25rem" fw="600" onClick={onLinkClick}>
        Workouts
      </Text>
    </AppShellNavbar>
  );
}

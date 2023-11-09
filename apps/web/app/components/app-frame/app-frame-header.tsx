import Link from 'next/link';
import {AppShellHeader, Burger, Group, Text} from '@mantine/core';

export function AppFrameHeader({opened, toggle}: {opened: boolean; toggle: () => void}) {
  return (
    <AppShellHeader bg="none">
      <Group
        h="100%"
        px={{base: 'xs', sm: 'sm', md: 'lg'}}
        style={{backdropFilter: 'blur(0.5rem)', WebkitBackdropFilter: 'blur(0.5rem)'}}
      >
        <Group justify="space-between" style={{flex: 1}}>
          <Text component={Link} href="/" ff="var(--font-teko)" fz="1.825rem" lh="1">
            SuperSet
          </Text>
          <Group ml="xl" visibleFrom="sm">
            <Text component={Link} href="/">
              Home
            </Text>
            <Text component={Link} href="/exercises">
              Exercises
            </Text>
            <Text component={Link} href="/workouts">
              Workouts
            </Text>
          </Group>
        </Group>
        <Burger size="sm" hiddenFrom="sm" opened={opened} onClick={toggle} />
      </Group>
    </AppShellHeader>
  );
}

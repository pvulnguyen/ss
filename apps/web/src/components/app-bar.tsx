import { Button, Flex, Menu, NavLink, Text } from '@mantine/core';
import { IconBarbell, IconHome, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useAuth } from '#/hooks';
import { ButtonLink } from './button-link';

export function AppBar() {
    const { signOut } = useAuth();

    return (
        <Flex w='100%' pos='sticky' bottom={0} mt={32}>
            <ButtonLink
                to='/'
                label='Home'
                variant='orange'
                leftIcon={<IconHome size={16} />}
                sx={{ borderRadius: '16px 0 0 0', fontSize: '12px' }}
            />

            <Menu position='top' withArrow>
                <Menu.Target>
                    <Button variant='orange' leftIcon={<IconBarbell size={16} />} sx={{ borderLeft: 0, borderRight: 0, borderRadius: 0 }}>
                        <Text size='xs'>Workout</Text>
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item component={Link} to='/workouts'>
                        Log
                    </Menu.Item>

                    <Menu.Item component={Link} to='/workouts/add'>
                        New Entry
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            <Menu position='top' withArrow>
                <Menu.Target>
                    <Button variant='orange' leftIcon={<IconSettings size={16} />} sx={{ borderRadius: '0 16px 0 0' }}>
                        <Text size='xs'>Settings</Text>
                    </Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <NavLink label='Sign Out' onClick={() => signOut()} />
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
}

'use client';

import {usePathname, useRouter} from 'next/navigation';
import {ScrollArea, Tabs} from '@mantine/core';
import styles from './tab-navigator.module.css';

export function TabNavigator({items}: {items: {name: string}[]}) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = items.map((item, i) => (
    <Tabs.Tab key={i} tt="capitalize" value={item.name}>
      {item.name}
    </Tabs.Tab>
  ));

  return (
    <ScrollArea h="3.125rem">
      <Tabs
        classNames={{list: styles.list}}
        onChange={(value) => {
          router.push(`/exercises/muscle-groups/${value}`);
        }}
        value={pathname}
      >
        <Tabs.List>
          <Tabs.Tab value="/exercises/muscle-groups">All</Tabs.Tab>
          {tabs}
        </Tabs.List>
      </Tabs>
    </ScrollArea>
  );
}

'use client';

import {Container, Grid, SimpleGrid, Skeleton, Title, rem} from '@mantine/core';

const PRIMARY_COLUMN_HEIGHT = rem(300);

export function Home() {
  const SECONDARY_COLUMN_HEIGHT = `calc(${PRIMARY_COLUMN_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="xl" px="0">
      <SimpleGrid cols={{base: 1, sm: 2}} spacing="md">
        <div>
          <Title order={2} size="h4">
            Last Workout
          </Title>
          <Skeleton height={`calc(${PRIMARY_COLUMN_HEIGHT} + 26.5px)`} />
        </div>
        <Grid gutter="md">
          <Grid.Col>
            <Title order={2} size="h4">
              Overview
            </Title>
            <Skeleton height={SECONDARY_COLUMN_HEIGHT} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={2} size="h4">
              Favorite Exercise
            </Title>
            <Skeleton height={SECONDARY_COLUMN_HEIGHT} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Title order={2} size="h4">
              Another Stat
            </Title>
            <Skeleton height={SECONDARY_COLUMN_HEIGHT} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

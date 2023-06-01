import { Stack, Text } from '@mantine/core';

export function AccordionLabel({ label, description }: { label: string; description: string }) {
    return (
        <Stack spacing={8}>
            <Text tt='capitalize' fw={600}>{label}</Text>
            <Text size='sm' color='dimmed' weight={400}>
                {description}
            </Text>
        </Stack>
    );
}

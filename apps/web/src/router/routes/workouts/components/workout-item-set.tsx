import { ActionIcon, NumberInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Trash } from '@phosphor-icons/react';
import type { WorkoutFormValues } from '../add-workout';

interface Props {
    form: UseFormReturnType<WorkoutFormValues>;
    index: number;
    setIndex: number;
};

export function WorkoutItemSet({ form, index, setIndex }: Props) {
    return (
        <>
            <NumberInput
                placeholder='lbs'
                {...form.getInputProps(`workoutItems.${index}.sets.${setIndex}.weight`)}
            />

            <NumberInput
                placeholder='reps'
                {...form.getInputProps(`workoutItems.${index}.sets.${setIndex}.reps`)}
            />

            <ActionIcon
                variant='red'
                onClick={() => form.removeListItem(`workoutItems.${index}.sets`, setIndex)}
            >
                <Trash />
            </ActionIcon>
        </>
    );
}

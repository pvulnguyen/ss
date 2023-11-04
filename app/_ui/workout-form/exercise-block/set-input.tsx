import {ActionIcon, Flex, NumberInput, Text, ThemeIcon} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {IconTrash} from '@tabler/icons-react';
import {WorkoutFormValues} from '../workout-form';

interface SetInputProps {
  form: UseFormReturnType<WorkoutFormValues>;
  exerciseIndex: number;
  setIndex: number;
}

export function SetInput({form, exerciseIndex, setIndex}: SetInputProps) {
  return (
    <Flex gap="md">
      <ThemeIcon variant="light" size="lg" radius="xl">
        <Text fw="bold">{setIndex + 1}</Text>
      </ThemeIcon>
      <NumberInput
        placeholder="Weight"
        variant="filled"
        allowNegative={false}
        decimalScale={2}
        {...form.getInputProps(`exercises.${exerciseIndex}.sets.${setIndex}.weight`)}
      />
      <NumberInput
        placeholder="Reps"
        variant="filled"
        clampBehavior="strict"
        min={0}
        suffix=" reps"
        {...form.getInputProps(`exercises.${exerciseIndex}.sets.${setIndex}.reps`)}
      />
      <ActionIcon
        variant="light"
        size="lg"
        color="red"
        radius="xl"
        onClick={() => form.removeListItem(`exercises.${exerciseIndex}.sets`, setIndex)}
      >
        <IconTrash />
      </ActionIcon>
    </Flex>
  );
}

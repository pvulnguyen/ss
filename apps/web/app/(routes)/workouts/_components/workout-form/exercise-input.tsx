import {AccordionControl, TextInput} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {WorkoutFormValues} from './workout-form';

interface ExerciseInputProps {
  form: UseFormReturnType<WorkoutFormValues>;
  index: number;
}

export function ExerciseInput({form, index}: ExerciseInputProps) {
  return (
    <AccordionControl>
      <TextInput
        placeholder={`Exercise ${index + 1}`}
        variant="unstyled"
        {...form.getInputProps(`exercises.${index}.exercise`)}
      />
    </AccordionControl>
  );
}

import {AccordionItem, AccordionPanel, Button, Flex, Stack} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {ExerciseInput} from './exercise-input';
import {SetInput} from './set-input';
import {WorkoutFormValues} from './workout-form';

interface ExerciseBlockProps {
  form: UseFormReturnType<WorkoutFormValues>;
  index: number;
}

export function ExerciseBlock({form, index}: ExerciseBlockProps) {
  const sets = form.values.exercises[index].sets.map((_, i) => (
    <SetInput key={i} form={form} exerciseIndex={index} setIndex={i} />
  ));
  
  return (
    <AccordionItem value={`form.values.exercises.${index}.exercise`}>
      <ExerciseInput form={form} index={index} />
      <AccordionPanel>
        <Stack gap="xs">
          {sets}
          <Flex gap="md" mt="xs">
            <Button
              variant="light"
              color="red"
              size="compact-md"
              w="100%"
              onClick={() => form.removeListItem('exercises', index)}
            >
              Delete Exercise
            </Button>
            <Button
              variant="light"
              size="compact-md"
              w="100%"
              onClick={() =>
                form.insertListItem(`exercises.${index}.sets`, {weight: null, reps: null})
              }
            >
              Add Set
            </Button>
          </Flex>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
}

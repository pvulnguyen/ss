import {Button} from '@mantine/core';
import {UseFormReturnType} from '@mantine/form';
import {WorkoutFormValues} from './workout-form';

export function AddExercise({form}: {form: UseFormReturnType<WorkoutFormValues>}) {
  return (
    <Button
      type="button"
      mt="xl"
      onClick={() =>
        form.insertListItem('exercises', {
          exercise: '',
          sets: [{weight: null, reps: null}],
        })
      }
      fullWidth
    >
      Add Exercise
    </Button>
  );
}

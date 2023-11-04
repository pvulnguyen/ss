'use client';

import {useState} from 'react';
import {toast} from 'react-toastify';

import {Accordion} from '@mantine/core';
import {useForm} from '@mantine/form';

import {SubmitButton} from '../submit-button';
import {AddExercise} from './add-exercise';
import {ExerciseBlock} from './exercise-block';

export interface WorkoutFormValues {
  exercises: {
    exercise: string;
    sets: {weight: number | null; reps: number | null}[];
  }[];
}

export function WorkoutForm() {
  const [isPending, setPending] = useState(false);

  const form = useForm<WorkoutFormValues>({
    initialValues: {exercises: [{exercise: '', sets: [{weight: null, reps: null}]}]},
  });

  const exercises = form.values.exercises.map((_, i) => (
    <ExerciseBlock key={i} index={i} form={form} />
  ));

  const handleSubmit = form.onSubmit(async (values) => {
    setPending(true);
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    setPending(false);
    if (!response.ok) {
      const {error} = await response.json();
      toast.error(error);
    } else {
      toast.success('Workout saved!');
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Accordion variant="filled" transitionDuration={500}>{exercises}</Accordion>
      <AddExercise form={form} />
      <SubmitButton label="Save Workout" mt="md" color="green" pending={isPending} fullWidth />
    </form>
  );
}

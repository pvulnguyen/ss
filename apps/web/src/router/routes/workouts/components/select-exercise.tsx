import { Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { Exercise } from '#/api/exercise-api';
import type { WorkoutFormValues } from '../add-workout';

type Props = {
    data: Exercise[];
    workoutForm: UseFormReturnType<WorkoutFormValues>;
    index: number;
};

export function SelectExercise({ data, workoutForm, index }: Props) {
    return (
        <Select
            searchable
            placeholder={data?.length === 0 ? 'Fetching exercises..' : 'Select Exercise'}
            data={data?.map(({ name }) => ({ value: name, label: name })) || []}
            {...workoutForm.getInputProps(`workoutItems.${index}.exercise`)}
        />
    );
}

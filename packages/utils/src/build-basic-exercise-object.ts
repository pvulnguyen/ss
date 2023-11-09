import {formatExerciseName} from './format-exercise-name';

import type {PredefinedExerciseNameRaw} from '@superset/data-access-exercises';

export async function buildBasicExerciseObject({exercise}: {exercise: PredefinedExerciseNameRaw}) {
  const formattedName = await formatExerciseName({exercise});
  return {id: exercise.id, name: formattedName};
}

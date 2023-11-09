import type {PredefinedExerciseNameRaw} from '@superset/data-access-exercises';

export async function formatExerciseName({exercise}: {exercise: PredefinedExerciseNameRaw}) {
  const {base, position, modifier, equipment} = exercise;

  const hasModifier = modifier?.name !== 'None';
  const hasPosition = position?.name !== 'None';
  const hasEquipment = equipment?.name !== 'None';

  const formatted = [
    hasModifier && modifier?.name,
    hasPosition && position?.name,
    hasEquipment && equipment?.name,
    base.name,
  ]
    .filter(Boolean)
    .join(' ');

  return formatted;
}

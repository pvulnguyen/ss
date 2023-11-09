import {PrismaClient} from '@prisma/client';
import * as data from './data';

async function seedDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.muscleGroup.deleteMany();
    console.log('Deleted muscle groups.');

    await prisma.equipment.deleteMany();
    console.log('Deleted equipment.');

    await prisma.base.deleteMany();
    console.log('Deleted bases.');

    await prisma.modifier.deleteMany();
    console.log('Deleted modifiers.');

    await prisma.position.deleteMany();
    console.log('Deleted positions.');

    await prisma.predefinedExercise.deleteMany();
    console.log('Deleted predefined exercises.');

    await prisma.$queryRaw`alter sequence muscle_groups_id_seq restart with 1`;
    console.log('Reset muscle group id autoincrement to 1.');

    await prisma.$queryRaw`alter sequence equipment_id_seq restart with 1`;
    console.log('Reset equipment id autoincrement to 1.');

    await prisma.$queryRaw`alter sequence bases_id_seq restart with 1`;
    console.log('Reset base id autoincrement to 1.');

    await prisma.$queryRaw`alter sequence modifiers_id_seq restart with 1`;
    console.log('Reset modifier id autoincrement to 1.');

    await prisma.$queryRaw`alter sequence positions_id_seq restart with 1`;
    console.log('Reset position id autoincrement to 1.');

    await prisma.muscleGroup.createMany({data: data.muscleGroups});
    console.log('Added muscle groups.');

    await prisma.equipment.createMany({data: data.equipment});
    console.log('Added equipment.');

    await prisma.modifier.createMany({data: data.modifiers});
    console.log('Added modifiers.');

    await prisma.position.createMany({data: data.positions});
    console.log('Added positions.');

    for (const base of data.bases) {
      const muscleGroupIds = await prisma.muscleGroup.findMany({
        where: {name: {in: base.muscleGroups}},
        select: {id: true},
      });

      await prisma.base.create({
        data: {
          name: base.name,
          muscleGroups: {
            connect: muscleGroupIds.map((muscleGroup) => ({
              id: muscleGroup.id,
            })),
          },
        },
      });
    }
    console.log(`Added base exercises with connections to muscle groups.`);

    const bases = await prisma.base.findMany({select: {id: true}});
    await prisma.predefinedExercise.createMany({data: bases.map((base) => ({baseId: base.id}))});
    console.log('Added all base exercises to the predefined exercises table.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();

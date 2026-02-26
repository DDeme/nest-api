import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { questions } from './schema';

const SEED_COUNT = 50;

const QUESTION_TYPES = [
  'multiple-choice',
  'true-false',
  'short-answer',
] as const;

type QuestionType = (typeof QUESTION_TYPES)[number];

function generateChoices(type: QuestionType): string[] {
  if (type === 'multiple-choice') {
    return Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () =>
      faker.lorem.words({ min: 1, max: 4 }),
    );
  }
  if (type === 'true-false') {
    return ['True', 'False'];
  }
  return [];
}

function generateQuestion(type: QuestionType): string {
  if (type === 'multiple-choice' || type === 'true-false') {
    return faker.helpers.arrayElement([
      `What is the ${faker.word.noun()} of ${faker.word.noun()}?`,
      `Which of the following best describes ${faker.word.noun()}?`,
      `${faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, '?')}`,
    ]);
  }
  return faker.lorem.sentence({ min: 5, max: 10 }).replace(/\.$/, '?');
}

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = postgres(databaseUrl);
  const db = drizzle(client);

  console.log(`Seeding ${SEED_COUNT} questions...`);

  const data = Array.from({ length: SEED_COUNT }, () => {
    const type = faker.helpers.arrayElement(QUESTION_TYPES);
    return {
      title: faker.lorem.sentence({ min: 3, max: 8 }).replace(/\.$/, ''),
      type,
      description: faker.datatype.boolean(0.7)
        ? faker.lorem.paragraph({ min: 1, max: 3 })
        : null,
      timeout: faker.helpers.arrayElement([15, 30, 45, 60, 90, 120]),
      choices: generateChoices(type),
      question: generateQuestion(type),
    };
  });

  await db.insert(questions).values(data);

  console.log(`Successfully seeded ${SEED_COUNT} questions.`);
  await client.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  description: text('description'),
  timeout: integer('timeout').notNull().default(30),
  choices: jsonb('choices').$type<string[]>().notNull().default([]),
  question: text('question').notNull(),
});

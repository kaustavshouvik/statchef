import { pgTable, smallint, text } from 'drizzle-orm/pg-core';

export const points = pgTable('points', {
  team: text('team').primaryKey(),
  points: smallint('points').notNull(),
});

import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  slug: text('slug').notNull().unique(),
  date: timestamp('date').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

import { pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const participants = pgTable('participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
})

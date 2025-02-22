import { relations } from 'drizzle-orm'
import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { events } from './events'
import { participants } from './participants'

export const eventParticipants = pgTable('event_participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id),
  participantId: uuid('participant_id')
    .notNull()
    .references(() => participants.id),
})

export const eventParticipantsRelations = relations(
  eventParticipants,
  ({ one }) => ({
    event: one(events, {
      fields: [eventParticipants.eventId],
      references: [events.id],
    }),
    participant: one(participants, {
      fields: [eventParticipants.participantId],
      references: [participants.id],
    }),
  })
)

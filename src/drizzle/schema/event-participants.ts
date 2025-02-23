import { relations } from 'drizzle-orm'
import { pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core'
import { events } from './events'
import { participants } from './participants'

export const eventParticipantsStatus = pgEnum('status', [
  'ACTIVE',
  'CANCELLED',
  'USED',
])

export const eventParticipants = pgTable('event_participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id),
  participantId: uuid('participant_id')
    .notNull()
    .references(() => participants.id),
  status: eventParticipantsStatus('status').default('ACTIVE'),
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

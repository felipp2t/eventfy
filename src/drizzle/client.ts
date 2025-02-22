import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env'
import { eventParticipants } from './schema/event-participants'
import { events } from './schema/events'
import { participants } from './schema/participants'

export const pg = postgres(env.POSTGRES_URL, { max: 2 })
export const db = drizzle(pg, {
  schema: {
    events,
    participants,
    eventParticipants,
  },
})

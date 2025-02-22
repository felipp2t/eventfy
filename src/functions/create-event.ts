import { db } from '../drizzle/client'
import { events } from '../drizzle/schema/events'
import { createSlug } from '../utils/create-slug'

interface CreateEventParams {
  name: string
  description: string
  date: Date
}

export const createEvent = async ({
  date,
  name,
  description,
}: CreateEventParams) => {
  const { slug } = createSlug(name)

  const event = await db
    .insert(events)
    .values({
      name,
      description,
      date,
      slug,
    })
    .returning()

  return {
    eventId: event[0].id,
  }
}

import { db } from '../drizzle/client'
import { eventParticipants } from '../drizzle/schema/event-participants'
import { participants } from '../drizzle/schema/participants'

interface SubscribeToEventParams {
  name: string
  email: string
  eventId: string
}

export const subscribeToEvent = async ({
  name,
  email,
  eventId,
}: SubscribeToEventParams) => {
  console.log({ name, email, eventId })
  
  const participant = await db
    .insert(participants)
    .values({
      name,
      email,
    })
    .returning()

  const subscription = await db
    .insert(eventParticipants)
    .values({
      eventId,
      participantId: participant[0].id,
    })
    .returning()

  return {
    subscriptionId: subscription[0].id,
  }
}

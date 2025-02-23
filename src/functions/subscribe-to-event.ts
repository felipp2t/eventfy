import { and, eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { eventParticipants } from '../drizzle/schema/event-participants'
import { events } from '../drizzle/schema/events'
import { participants } from '../drizzle/schema/participants'
import { type Either, left, right } from '../eihter'
import { EventNotFound } from '../errors/event-not-found'

interface SubscribeToEventParams {
  name: string
  email: string
  eventId: string
}

type SubscribeToEventResponse = Either<
  EventNotFound,
  { subscriptionId: string }
>

export const subscribeToEvent = async ({
  name,
  email,
  eventId,
}: SubscribeToEventParams): Promise<SubscribeToEventResponse> => {
  const event = await db.select().from(events).where(eq(events.id, eventId))

  if (event.length === 0) {
    return left(new EventNotFound())
  }

  const participant = await db
    .select()
    .from(participants)
    .where(eq(participants.email, email))

  if (participant.length === 0) {
    const newParticipant = await db
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
        participantId: newParticipant[0].id,
      })
      .returning()

    return right({
      subscriptionId: subscription[0].id,
    })
  }

  const eventSubscription = await db
    .select()
    .from(eventParticipants)
    .where(
      and(
        eq(eventParticipants.eventId, eventId),
        eq(eventParticipants.participantId, participant[0].id)
      )
    )

  if (eventSubscription.length === 0) {
    const subscription = await db
      .insert(eventParticipants)
      .values({
        eventId,
        participantId: participant[0].id,
      })
      .returning()

    return right({
      subscriptionId: subscription[0].id,
    })
  }

  if (eventSubscription[0].status === 'CANCELLED') {
    const subscription = await db
      .update(eventParticipants)
      .set({ status: 'ACTIVE' })
      .where(eq(eventParticipants.participantId, participant[0].id))
      .returning()

    return right({
      subscriptionId: subscription[0].id,
    })
  }

  return right({
    subscriptionId: eventSubscription[0].id,
  })
}

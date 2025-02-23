import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { eventParticipants } from '../drizzle/schema/event-participants'
import { participants } from '../drizzle/schema/participants'

interface CancelSubscriptionParams {
  subscriptionId: string
}

export const cancelSubscription = async ({
  subscriptionId,
}: CancelSubscriptionParams) => {
  const deletedEventParticipant = await db
    .delete(eventParticipants)
    .where(eq(eventParticipants.id, subscriptionId))
    .returning()

  await db
    .delete(participants)
    .where(eq(participants.id, deletedEventParticipant[0].participantId))
}

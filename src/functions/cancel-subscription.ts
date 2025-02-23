import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { eventParticipants } from '../drizzle/schema/event-participants'

interface CancelSubscriptionParams {
  subscriptionId: string
}

export const cancelSubscription = async ({
  subscriptionId,
}: CancelSubscriptionParams) =>
  await db
    .update(eventParticipants)
    .set({ status: 'CANCELLED' })
    .where(eq(eventParticipants.id, subscriptionId))

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { cancelSubscription } from '../functions/cancel-subscription'

export const cancelSubscriptionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/subscriptions/:subscriptionId',
    {
      schema: {
        summary: 'Cancel a subscription',
        tags: ['subscriptions'],
        params: z.object({
          subscriptionId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriptionId } = request.params

      await cancelSubscription({ subscriptionId })
      
      return reply.redirect(env.WEB_URL, 204)
    }
  )
}

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { env } from '../env'
import { subscribeToEvent } from '../functions/subscribe-to-event'

const bodySchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z
    .string()
    .email('Invalid email address')
    .min(3, 'Email must be at least 3 characters long'),
})

const paramsSchema = z.object({
  eventId: z.string()
})

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/events/:eventId/subscribe',
    {
      schema: {
        summary: 'Subscribe to an event',
        tags: ['subscriptions'],
        body: bodySchema,
        params: paramsSchema,
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body
      const { eventId } = request.params

      const { subscriptionId } = await subscribeToEvent({
        name,
        email,
        eventId,
      })

      return reply.redirect(
        `${env.WEB_URL}/events/${subscriptionId}/ticket`,
        302
      )
    }
  )
}

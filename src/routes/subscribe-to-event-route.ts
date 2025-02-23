import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

const bodySchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z
    .string()
    .email('Invalid email address')
    .min(3, 'Email must be at least 3 characters long'),
})

const paramsSchema = z.object({
  eventId: z.string(),
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
          201: z.object({
            subscriptionId: z.string().uuid(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async request => {
      const { name, email } = request.body
      const { eventId } = request.params

<<<<<<< HEAD
      const response = await subscribeToEvent({
=======
      const resposne = await subscribeToEvent({
>>>>>>> 3fadc04990c9db9774d86da209069bf2ef76250d
        name,
        email,
        eventId,
      })

<<<<<<< HEAD
      if (response.isLeft()) {
        return { message: response.value.message }
      }

      const { subscriptionId } = response.value
=======
      if (resposne.isLeft()) {
        return { message: resposne.value.message }
      }

      const { subscriptionId } = resposne.value
>>>>>>> 3fadc04990c9db9774d86da209069bf2ef76250d

      return { subscriptionId }
    }
  )
}

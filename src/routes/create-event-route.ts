import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createEvent } from '../functions/create-event'

const bodySchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters long'),
  date: z.coerce.date().refine(
    date => {
      const today = new Date()
      const minDate = new Date(today)
      minDate.setDate(today.getDate() + 2)
      return date >= minDate
    },
    { message: 'Date must be at least 2 days in the future' }
  ),
})

export const createEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/events',
    {
      schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: bodySchema,
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async request => {
      const { name, date, description } = request.body

      const { eventId } = await createEvent({
        name,
        date,
        description,
      })

      return { eventId }
    }
  )
}

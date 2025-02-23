import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { cancelSubscriptionRoute } from './routes/cancel-subscription-route'
import { createEventRoute } from './routes/create-event-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Eventfy API',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyCors)

app.register(
  async instance => {
    instance.register(createEventRoute)
    instance.register(subscribeToEventRoute)
    instance.register(cancelSubscriptionRoute)
  },
  { prefix: '/api' }
)

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log('Server is running on port 3333'))

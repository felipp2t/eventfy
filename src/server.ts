import { fastifyCors } from '@fastify/cors'
import fastify from 'fastify'

const app = fastify()

app.register(fastifyCors)

app.get('/', async (request, reply) => {
  return { message: 'Hello, World!' }
})

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('Server is running on port 3333'))

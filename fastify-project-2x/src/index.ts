import { env } from './env'
import { server } from './server'

server
  .listen({
    port: env.PORT,
  })
  .then(() =>
    console.log(
      `[SERVER] - Running on port ${env.PORT}\n\n  - Development url: http://localhost:${env.PORT}/\n`,
    ),
  )

import fastify from 'fastify'

const app = fastify()

app.get('/', (req, res) => {
  return res.send({
    example: 'a',
  })
})

app
  .listen({
    port: 4000,
  })
  .then(() =>
    console.log(
      `[SERVER] - Running on port 4000\n\n  - Development url: http://localhost:4000/`,
    ),
  )

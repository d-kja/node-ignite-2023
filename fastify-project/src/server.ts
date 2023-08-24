import fastify from 'fastify'

const app = fastify()

app.get('/', async (req, res) => {
  return res.send()
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

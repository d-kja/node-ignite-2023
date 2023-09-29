import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  // Checking if refresh token cookie is valid
  request.jwtVerify({
    onlyCookie: true,
  })

  const token = await reply.jwtSign(
    {
      role: 'MEMBER',
    },
    {
      sign: {
        sub: '...',
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role: 'MEMBER',
    },
    {
      sign: {
        sub: '...',
        expiresIn: '7d',
      },
    },
  )

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      sameSite: true,
      secure: true,
      httpOnly: true,
      path: '/',
    })
    .send({
      token,
    })
}

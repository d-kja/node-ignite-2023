import { FastifyReply, FastifyRequest } from 'fastify'

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  /**
   * Validates the cookies set on the cookie option when registering the plugin
   * and ignore completely the Authorization header
   */
  await request.jwtVerify({
    onlyCookie: true,
  })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user?.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .send({
      token,
    })
}

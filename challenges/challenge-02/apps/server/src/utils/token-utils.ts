import jwt from 'jsonwebtoken'

import { env } from '../../env'
import { db } from '../database'

export type TokenPayload = {
  session_id: string
  user_id: string
}

export const generateTokens = async (data: TokenPayload) => {
  const token = jwt.sign(data, env.JWT_TOKEN_SECRET, {
    expiresIn: '1h',
  })
  const refreshToken = jwt.sign(data, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '30d',
  })

  await updateStoredTokens({ refreshToken, sessionId: data.session_id })

  return {
    token,
    refreshToken,
  }
}

type RefreshTokenPayload = {
  refreshToken: string
}

export const refreshAccessToken = async ({
  refreshToken,
}: RefreshTokenPayload) => {
  const decodedData = jwt.verify(
    refreshToken,
    env.JWT_REFRESH_TOKEN_SECRET,
  ) as TokenPayload

  const userSession = await verifyStoredTokens({
    refreshToken,
    sessionId: decodedData.session_id,
  })

  const newTokenBody = {
    session_id: userSession.session_id,
    user_id: userSession.user_id,
  }

  return await generateTokens(newTokenBody)
}

type VerifyStoredTokensPayload = {
  refreshToken: string
  sessionId: string
}

const verifyStoredTokens = async ({
  refreshToken,
  sessionId,
}: VerifyStoredTokensPayload) => {
  const userSession = await db('session').where('session_id', sessionId).first()

  if (!userSession) throw new Error('User session not found.')
  if (userSession.refresh_token !== refreshToken)
    throw new Error("Tokens don't match.")

  return {
    session_id: userSession.session_id,
    user_id: userSession.user_id,
  }
}

type UpdateStoredTokensPayload = {
  refreshToken: string
  sessionId: string
}

const updateStoredTokens = async ({
  sessionId,
  refreshToken,
}: UpdateStoredTokensPayload) => {
  await db('session').where('session_id', sessionId).update({
    refresh_token: refreshToken,
  })
}

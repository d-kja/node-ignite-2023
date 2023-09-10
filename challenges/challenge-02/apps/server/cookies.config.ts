const appPrefix = '@daily-diet'

export const cookiesPrefix = {
  session: `${appPrefix}/session-id`,
  refreshToken: `${appPrefix}/refresh-token`,
  accessToken: `${appPrefix}/token`,
}

export const cookieConfigBody = {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  httpOnly: true,
  sameSite: 'strict',
  path: '/',
  secure: process.env.NODE_ENV === 'production',
} as const

import { ServerResponse } from '@/@types/index.js'

export const json = (data: unknown) => JSON.stringify(data)

export const status = ({
  response,
  code = 200,
}: {
  response: ServerResponse
  code: number
}) => (response.statusCode = code)

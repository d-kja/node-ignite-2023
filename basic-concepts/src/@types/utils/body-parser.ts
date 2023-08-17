import { Readable } from 'stream'

export type BodyParserParams = Readable & { body?: Record<string, any> | null }

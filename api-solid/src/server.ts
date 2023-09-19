import fastify from 'fastify'
import { Routes } from './http/routes'

export const server = fastify()

server.register(Routes)

import type { FastifyRequest } from 'fastify'

import { type User } from '~/models/index.js'

export function extractUserFromRequest(req: FastifyRequest): User | undefined {
  return req.session?.user as User
}

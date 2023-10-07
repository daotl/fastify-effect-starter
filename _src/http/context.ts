import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import type { Session } from '~/auth/index.js'
import type { User } from '~/models/index.js'

export type Context = CreateFastifyContextOptions & {
  session?: Session
  user?: User
}

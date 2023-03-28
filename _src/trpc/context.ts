import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import type * as Fa from 'fastify'

import type * as http from '~/http/index.js'

export type Context = http.Context

// created for each request
export const genCreateContext =
  () => ({ req, res }: CreateFastifyContextOptions): Context =>
    ({
      req: req as unknown as Fa.FastifyRequest,
      res: res as unknown as Fa.FastifyReply,
    }) as unknown as Context

// import { inferAsyncReturnType } from '@trpc/server'
// export function createContext({ req, res }: CreateFastifyContextOptions) {
//   let username = req.headers['username']
//   if (Array.isArray(username)) {
//     username = username[0]
//   }
//   const user: User = { name: username ?? 'anonymous' }

//   return { req, res, user }
// }

// export type Context = inferAsyncReturnType<typeof createContext>

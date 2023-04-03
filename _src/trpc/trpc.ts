import type { Context } from './context.js'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const p = {
  public: t.procedure,
  optional: t.procedure,
  protected: t.procedure,
  admin: t.procedure,
}

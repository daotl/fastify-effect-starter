import * as trpc from '@trpc/server'
import type { DefaultErrorShape } from '@trpc/server/error/formatter'
import superjson from 'superjson'

import { effectify } from '@daotl-effect/trpc'

import type { Context } from './context.js'

const opts = {
  transformer: superjson,
  errorFormatter({ shape }: { shape: DefaultErrorShape }) {
    return shape
  },
}

const builder = trpc.initTRPC.context<Context>()
const _t = builder.create(opts)

type TParams = typeof builder extends trpc.TRPCBuilder<infer TParams>
  ? TParams
  : never

export const t = effectify(Runtime.defaultRuntime)<TParams, typeof opts>(_t)

export const p = {
  public: t.procedure,
  optional: t.procedure,
  protected: t.procedure,
  admin: t.procedure,
}

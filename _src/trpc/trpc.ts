import * as trpc from '@trpc/server'
import type { DefaultErrorShape } from '@trpc/server/error/formatter'
import superjson from 'superjson'

import { effectify } from '@daotl-effect/trpc'

import type { User } from '~/models/index.js'
import { runtime } from '~/setup.js'

import { extractUserFromRequest } from '~/auth/utils.js'
import type { Context } from './context.js'
import { permissions } from './permissions.js'

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

export const t = effectify(runtime)<TParams, typeof opts>(_t)
interface ProcedureCtx<Ctx extends Context> {
  public: Omit<Ctx, 'user'> & { user: never }
  optional: Ctx
  protected: Omit<Ctx, 'user'> & { user: User }
  admin: Ctx
}

export type ProcedureContext = ProcedureCtx<Context>

const trpcErrUnauthorized = new trpc.TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Unauthorized',
})

const publicMiddleware = t.middleware(async ({ ctx, next }) => {
  return next({
    ctx: {
      ...ctx,
      // @ts-expect-error
      req: { ...req, session: { ...req.session, user: undefined } },
    } as unknown as ProcedureContext['public'],
  })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function checkSignedInUserMiddleware<Optional extends boolean>(
  optional: Optional,
) {
  return t.middleware(async ({ ctx, next }) => {
    const user = extractUserFromRequest(ctx.req)

    if (!optional && !user) {
      throw trpcErrUnauthorized
    }

    return next({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ctx: {
        ...ctx,
        user,
      } as unknown as ProcedureContext[Optional extends true
        ? 'optional'
        : 'protected'],
    })
  })
}

const checkAdminMiddleware = t.middleware(async (/*{ ctx, next }*/) => {
  throw trpcErrUnauthorized
  // return next({
  //   ctx: ctx as ProcedureContext['admin'],
  // })
})

export const p = {
  public: t.procedure.use(publicMiddleware).use(permissions()),
  optional: t.procedure
    .use(checkSignedInUserMiddleware(true))
    .use(permissions()),
  protected: t.procedure
    .use(checkSignedInUserMiddleware(false))
    .use(permissions()),
  admin: t.procedure.use(checkAdminMiddleware).use(permissions()),
}

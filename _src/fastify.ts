import cookie from '@fastify/cookie'
import middie from '@fastify/middie'
import { fastifyRequestContext } from '@fastify/request-context'
import wss from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import * as Fa from 'fastify'
import type { Spread } from 'type-fest'

import {
  AuthConfig,
  type AuthLevel,
  authRoutes,
  newAuthHook,
  newSessionCache,
} from './auth/index.js'
import type { User } from './models/index.js'
import type * as http from '~/http/index.js'
import { genCreateContext, trpcRouter } from '~/trpc/index.js'

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
}

export interface FastifyContextConfig {
  authLevel: AuthLevel
}

export async function createFastify(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/api/trpc'

  const f1 = Fa.fastify({ logger: dev })
    .register(middie)
    .register(cookie)
    .register(fastifyRequestContext, {
      hook: 'onRequest',
      defaultStoreValues: () => ({ user: {} as unknown as User }),
    })
    .register(wss as unknown as Fa.FastifyPluginCallback)
    .register(fastifyTRPCPlugin, {
      prefix,
      useWSS: true,
      trpcOptions: {
        router: trpcRouter,
        createContext: genCreateContext(),
        wss,
      },
    })

  type Types = Parameters<typeof f1['route']>[0] extends Fa.RouteOptions<
    infer RawServer,
    infer RawRequest,
    infer RawReply,
    infer RouteGeneric,
    unknown,
    infer SchemaCompiler,
    infer TypeProvider
  >
    ? {
        RawServer: RawServer
        RawRequest: RawRequest
        RawReply: RawReply
        RouteGeneric: RouteGeneric
        SchemaCompiler: SchemaCompiler
        TypeProvider: TypeProvider
      }
    : never

  const route = (
    opts: Fa.RouteOptions<
      Types['RawServer'],
      Types['RawRequest'],
      Types['RawReply'],
      Types['RouteGeneric'],
      FastifyContextConfig,
      Types['SchemaCompiler'],
      Types['TypeProvider']
    >,
  ) => f1.route<Fa.RouteGenericInterface, FastifyContextConfig>(opts)
  type RouteFn = typeof route

  const authConfig = new AuthConfig()
  const sessionCache = newSessionCache()
  const fastify = f1
    .addHook('onRequest', newAuthHook(authConfig, sessionCache))
    // Middlewares
    // Routes
    .get('/', (req) => {
      const user = (req.requestContext as http.Context).user
      return { msg: `hello ${user?.name ?? 'anonymous'}` }
    })
    .register(authRoutes(authConfig, sessionCache), { prefix: '/api/auth' })

  const start = async () => {
    try {
      await fastify.listen({ port })
      console.log('listening on port', port)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }

  const stop = () => fastify.close()

  type R = Exclude<typeof fastify, PromiseLike<undefined>>

  return {
    fastify: fastify as Spread<
      Fa.FastifyInstance,
      {
        route: RouteFn
      }
    >,
    start,
    stop,
  }
}

export type Fastify = Awaited<ReturnType<typeof createFastify>>['fastify']

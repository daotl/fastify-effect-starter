import fastifyCookie from '@fastify/cookie'
import fastifyMiddie from '@fastify/middie'
import { fastifyRequestContext } from '@fastify/request-context'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyWebSocket from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import * as Fa from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { Spread } from 'type-fest'

import {
  AuthConfig,
  type AuthLevel,
  authRoutes,
  newAuthHook,
  newSessionCache,
} from '~/auth/index.js'
import type * as http from '~/http/index.js'
import type { User } from '~/models/index.js'
import { genCreateContext, trpcRouter } from '~/trpc/index.js'

export type ServerOptions = {
  dev?: boolean
  port?: number
  prefix?: string
}

export type FastifyContextConfig = {
  authLevel: AuthLevel
}

export type FastifyNestedRoutes = Fa.FastifyPluginCallback<
  {},
  Fa.RawServerDefault,
  ZodTypeProvider
>

export async function createFastify(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/api/trpc'

  const f1 = Fa.fastify({ logger: dev })
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler)
    .withTypeProvider<ZodTypeProvider>()
    .register(fastifyMiddie)
    .register(fastifyCookie)
    .register(fastifyRequestContext, {
      hook: 'onRequest',
      defaultStoreValues: () => ({ user: {} as unknown as User }),
    })
    .register(fastifyWebSocket as unknown as Fa.FastifyPluginCallback)
    .register(fastifySwagger, {
      openapi: {
        info: {
          title: 'SampleApi',
          description: 'Sample backend service',
          version: '1.0.0',
        },
        servers: [],
      },
      transform: jsonSchemaTransform,
      // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
      //
      // transform: createJsonSchemaTransform({
      //   skipList: [ '/documentation/static/*' ]
      // })
    })
    .register(fastifySwaggerUI, {
      routePrefix: '/documentation',
    })
    .register(fastifyTRPCPlugin, {
      prefix,
      useWSS: true,
      trpcOptions: {
        router: trpcRouter,
        createContext: genCreateContext(),
        wss: fastifyWebSocket,
      },
    })

  type RouteOptionsTypes = Parameters<
    typeof f1['route']
  >[0] extends Fa.RouteOptions<
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
      RouteOptionsTypes['RawServer'],
      RouteOptionsTypes['RawRequest'],
      RouteOptionsTypes['RawReply'],
      RouteOptionsTypes['RouteGeneric'],
      FastifyContextConfig,
      RouteOptionsTypes['SchemaCompiler'],
      RouteOptionsTypes['TypeProvider']
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

  type FastifyTypes = typeof f1 extends Fa.FastifyInstance<
    infer RawServer,
    infer RawRequest,
    infer RawReply,
    infer Logger,
    infer TypeProvider
  >
    ? {
        RawServer: RawServer
        RawRequest: RawRequest
        RawReply: RawReply
        Logger: Logger
        TypeProvider: TypeProvider
      }
    : never

  return {
    fastify: fastify as Spread<
      Fa.FastifyInstance<
        FastifyTypes['RawServer'],
        FastifyTypes['RawRequest'],
        FastifyTypes['RawReply'],
        FastifyTypes['Logger'],
        FastifyTypes['TypeProvider']
      >,
      {
        route: RouteFn
      }
    >,
    start,
    stop,
  }
}

export type Fastify = Awaited<ReturnType<typeof createFastify>>['fastify']

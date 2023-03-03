import path from 'node:path'
import url from 'node:url'

import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyCsrfProtection from '@fastify/csrf-protection'
import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyMiddie from '@fastify/middie'
import { fastifyRequestContext } from '@fastify/request-context'
import fastifySession from '@fastify/session'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyWebSocket from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import * as Fa from 'fastify'
import * as FastifyZod from 'fastify-type-provider-zod'
import { StatusCodes } from 'http-status-codes'

import type { Spread, ValueOf } from 'type-fest'
import type { ZodTypeAny } from 'zod'

import * as auth from '~/auth/index.js'
import type { User } from '~/models/index.js'
import * as trpc from '~/trpc/index.js'

export type ServerOptions = {
  dev?: boolean
  port?: number
  prefix?: string
}

export type FastifyContextConfig = {
  authLevel: auth.AuthLevel
}

export type FastifyNestedRoutes = Fa.FastifyPluginCallback<
  {},
  Fa.RawServerDefault,
  FastifyZod.ZodTypeProvider
>
export interface FastifyZodSchema {
  body?: ZodTypeAny
  querystring?: ZodTypeAny
  params?: ZodTypeAny
  headers?: ZodTypeAny
  response?: Partial<Record<ValueOf<typeof StatusCodes>, ZodTypeAny>>
}

declare module 'fastify' {
  interface Session {
    user: User
  }
}

declare module '@fastify/request-context' {
  interface RequestContextData {}
}

export async function createFastify(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/api/trpc'

  const f1 = Fa.fastify({ logger: dev })
    // Zod schema validator
    // https://github.com/turkerdev/fastify-type-provider-zod
    .setValidatorCompiler(FastifyZod.validatorCompiler)
    .setSerializerCompiler(FastifyZod.serializerCompiler)
    .withTypeProvider<FastifyZod.ZodTypeProvider>()
    // Middleware
    // https://github.com/fastify/middie
    .register(fastifyMiddie)
    // Add security headers
    // https://github.com/fastify/fastify-helmet
    .register(fastifyHelmet, {
      contentSecurityPolicy: false,
    })
    // CORS
    // https://github.com/fastify/fastify-cors
    .register(fastifyCors, {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      // exposedHeaders: ['Content-Range', 'X-Content-Range'],
      credentials: true,
      // maxAge: 86400,
    })
    // Parse and set cookies
    // https://github.com/fastify/fastify-cookie
    .register(fastifyCookie, { secret: 'COOKIE_SECRET' }) // See following section to ensure security
    // Session
    // https://github.com/fastify/session
    .register(fastifySession, {
      secret: 'a secret with minimum length of 32 characters',
      cookie: {
        secure: 'auto',
        maxAge: 1800_000,
      },
    })
    // CSRF protection
    // https://github.com/fastify/csrf-protection
    .register(fastifyCsrfProtection, { cookieOpts: { signed: true } })
    // Serve static files
    // https://github.com/fastify/fastify-static
    .register(fastifyStatic, {
      root: path.resolve(url.fileURLToPath(import.meta.url), '../../public'),
      // prefix: '/public/', // optional: default '/'
    })
    // Request-scoped storage
    // https://github.com/fastify/fastify-request-context
    .register(fastifyRequestContext, {
      hook: 'onRequest',
      // defaultStoreValues: () => ({ user: {} as unknown as User }),
    })
    // application/x-www-form-urlencoded
    // https://github.com/fastify/fastify-formbody
    .register(fastifyFormBody)
    // WebSocket based on ws@8
    // https://github.com/fastify/fastify-websocket
    .register(fastifyWebSocket as unknown as Fa.FastifyPluginCallback)
    // Swagger (OpenAPI v3)
    // https://github.com/fastify/fastify-swagger
    .register(fastifySwagger, {
      openapi: {
        info: {
          title: 'SampleApi',
          description: 'Sample backend service',
          version: '1.0.0',
        },
        servers: [],
      },
      transform: FastifyZod.jsonSchemaTransform,
      // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
      //
      // transform: createFastifyZod.JsonSchemaTransform({
      //   skipList: [ '/documentation/static/*' ]
      // })
    })
    // https://github.com/fastify/fastify-swagger-ui
    .register(fastifySwaggerUI, {
      routePrefix: '/documentation',
    })
    // tRPC
    // https://trpc.io/docs/fastify
    .register(fastifyTRPCPlugin, {
      prefix,
      useWSS: true,
      trpcOptions: {
        router: trpc.trpcRouter,
        createContext: trpc.genCreateContext(),
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
    Fa.FastifySchema,
    infer TypeProvider
  >
    ? {
        RawServer: RawServer
        RawRequest: RawRequest
        RawReply: RawReply
        RouteGeneric: RouteGeneric
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
      FastifyZodSchema,
      RouteOptionsTypes['TypeProvider']
    >,
  ) =>
    f1.route<Fa.RouteGenericInterface, FastifyContextConfig, FastifyZodSchema>(
      opts,
    )
  type RouteFn = typeof route

  const authConfig = new auth.Config()
  const fastify = f1
    .addHook('onRequest', auth.newAuthHook(authConfig))
    // Middlewares
    // Routes
    .get('/api/hello', (req) => {
      const oUserName = Option.fromNullable(req.session.user).map(
        R.prop('name'),
      )

      return { msg: `hello ${oUserName.getOrElse('anonymous')}` }
    })
    .register(auth.routes(authConfig), { prefix: '/api/auth' })

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

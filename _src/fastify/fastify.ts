import type http from 'node:http'
import path from 'node:path'
import url from 'node:url'

import fastifyCaching from '@fastify/caching'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyCsrfProtection from '@fastify/csrf-protection'
import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyMiddie from '@fastify/middie'
import { fastifyRequestContext } from '@fastify/request-context'
import fastifySession from '@fastify/session'
import fastifyStatic from '@fastify/static'
// import fastifySwagger from '@fastify/swagger'
// import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyWebSocket from '@fastify/websocket'
import * as Fa from 'fastify'
import fastifyHealthCheck from 'fastify-healthcheck'
import * as FastifyEffectSchema from 'fastify-type-provider-effect-schema'
import type { StatusCodes } from 'http-status-codes'

import type * as auth from '~/auth/index.js'
import type { User } from '~/models/index.js'

export type ServerOptions = {
  dev?: boolean
  port?: number
}

export type FastifyContextConfig = {
  authLevel: auth.AuthLevel
}

export type FastifyNestedRoutes = Fa.FastifyPluginCallback<
  Record<never, never>,
  Fa.RawServerDefault,
  FastifyEffectSchema.EffectSchemaTypeProvider
>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type SchemaTypeAny = Schema<any, any>
export interface FastifyEffectSchemaSchema {
  body?: SchemaTypeAny
  querystring?: SchemaTypeAny
  params?: SchemaTypeAny
  headers?: SchemaTypeAny
  response?: Partial<Record<ValueOf<typeof StatusCodes>, SchemaTypeAny>>
}

declare module 'fastify' {
  interface Session {
    user: User
  }
}

declare module '@fastify/request-context' {
  interface RequestContextData {}
}

export function createFastify<
  Server extends http.Server = http.Server,
  Logger extends Fa.FastifyBaseLogger = Fa.FastifyBaseLogger,
>(opts?: Fa.FastifyHttpOptions<Server, Logger>) {
  const fastify = Fa.fastify(opts)
    // Effect schema validator
    // https://github.com/turkerdev/fastify-type-provider-effect-schema
    .setValidatorCompiler(FastifyEffectSchema.validatorCompiler)
    .setSerializerCompiler(FastifyEffectSchema.serializerCompiler)
    .withTypeProvider<FastifyEffectSchema.EffectSchemaTypeProvider>()
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
    .register(fastifyCsrfProtection, {
      cookieOpts: { signed: true },
      sessionPlugin: '@fastify/session',
    })
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
    // Caching & cache control headers
    .register(fastifyCaching, {
      privacy: (fastifyCaching.privacy as unknown as fastifyCaching.Privacy)
        .NOCACHE,
    })
    // WebSocket based on ws@8
    // https://github.com/fastify/fastify-websocket
    .register(fastifyWebSocket.default)
    // Swagger (OpenAPI v3)
    // https://github.com/fastify/fastify-swagger
    // .register(fastifySwagger, {
    //   openapi: {
    //     info: {
    //       title: 'SampleApi',
    //       description: 'Sample backend service',
    //       version: '1.0.0',
    //     },
    //     servers: [],
    //   },
    // transform: FastifyEffectSchema.jsonSchemaTransform,
    // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
    //
    // transform: createFastifyZod.JsonSchemaTransform({
    //   skipList: [ '/documentation/static/*' ]
    // })
    // })
    // https://github.com/fastify/fastify-swagger-ui
    // .register(fastifySwaggerUI, {
    //   routePrefix: '/swagger',
    // })
    // Health check `GET /health`
    .register(fastifyHealthCheck)

  return fastify
}

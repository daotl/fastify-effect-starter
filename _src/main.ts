import fastifyWebSocket from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'

import { Fastify } from '~/fastify/index.js'
import * as auth from '~/auth/index.js'
import * as trpc from '~/trpc/index.js'
import { runtime, authConfig } from './setup.js'

export const initFastify = Fastify.accessFastify.tap((fastify) => {
  fastify
    .addHook('onRequest', auth.newAuthHook(authConfig))
    // tRPC
    // https://trpc.io/docs/fastify
    .register(fastifyTRPCPlugin, {
      prefix: '/api/trpc',
      useWSS: true,
      trpcOptions: {
        router: trpc.trpcRouter,
        createContext: trpc.genCreateContext(),
        wss: fastifyWebSocket,
      },
    })
    .register(
      // https://github.com/sachinraja/trpc-playground/issues/28
      // @ts-expect-error ignore
      getFastifyPlugin({
        trpcApiEndpoint: '/api/trpc',
        playgroundEndpoint: '/api/trpc-playground',
        router: trpc.trpcRouter,
        // https://github.com/sachinraja/trpc-playground/issues/44
        request: {
          superjson: true, // <- set this to true
        },
      }),
      { prefix: '/api/trpc-playground' },
    )
  // Middlewares
  return Effect.unit
})

const routes =
  auth.routes(authConfig)({ prefix: '/api/auth' }) >
  Fastify.get('/api/hello', (req) => {
    const oUserName = Option.fromNullable(req.session.user).map(R.prop('name'))

    return Effect.succeed({ msg: `hello ${oUserName.getOrElse('anonymous')}` })
  })

export const main = initFastify > routes > Fastify.listen

await runtime.runPromise(main)

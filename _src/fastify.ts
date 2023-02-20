import wss from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import * as Fa from 'fastify'

import { createContext, trpcRouter } from '~/trpc/index.js'

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
}

export function createFastify(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/trpc'

  const fastify = Fa.fastify({ logger: dev })

  fastify
    .register(wss as unknown as Fa.FastifyPluginCallback<any, any, any, any>)
    .register(fastifyTRPCPlugin, {
      prefix,
      useWSS: true,
      trpcOptions: { router: trpcRouter, createContext, wss },
    })

  fastify.get('/', async () => {
    return { hello: 'wait-on 💨' }
  })

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

  return { fastify, start, stop }
}

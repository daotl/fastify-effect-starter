import { CauseException } from '@effect-app/infra/errors'
import * as Fa from 'fastify'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import wss from '@fastify/websocket'

import { runtimeDebug } from '@effect/io/Debug'

import { trpcRouter } from './trpcRouter/index.js'
import { createContext } from './trpcRouter/context.js'

runtimeDebug.traceStackLimit = 50
if (process.argv.includes('--debug')) {
  runtimeDebug.minumumLogLevel = 'Debug'
  runtimeDebug.tracingEnabled = true
  runtimeDebug.traceStackLimit = 100
  // runtimeDebug.filterStackFrame = _ => true
}

const main = Effect.gen(function* ($) {
  const cfg = {}
  console.debug(`Config: ${JSON.stringify(cfg, undefined, 2)}`)

  return yield* $(Effect.never().scoped /*.provideLayer(api(cfg))*/)
})

const program = main //.provideSomeLayer()

export class AppException<E> extends CauseException<E> {
  constructor(cause: Cause<E>) {
    super(cause, 'App')
  }
}
const reportAppError = <E>(cause: Cause<E>) => {
  console.error(new AppException(cause))
  return Effect.unit
}

program.tapErrorCause(reportAppError).runMain()
console.log('hi world')

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
}
export function createServer(opts: ServerOptions) {
  const dev = opts.dev ?? true
  const port = opts.port ?? 3000
  const prefix = opts.prefix ?? '/trpc'
  const server = Fa.fastify({ logger: dev })

  server.register(
    wss as unknown as Fa.FastifyPluginCallback<any, any, any, any>,
  )
  server.register(fastifyTRPCPlugin, {
    prefix,
    useWSS: true,
    trpcOptions: { router: trpcRouter, createContext, wss },
  })

  server.get('/', async () => {
    return { hello: 'wait-on 💨' }
  })

  const stop = () => server.close()
  const start = async () => {
    try {
      await server.listen({ port })
      console.log('listening on port', port)
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return { server, start, stop }
}

createServer({}).start()

import { CauseException } from '@effect-app/infra/errors'

import { runtimeDebug } from '@effect/io/Debug'

import * as auth from './auth/index.js'
import { type ServerOptions, createFastify } from '~/fastify/index.js'

runtimeDebug.traceStackLimit = 50
if (process.argv.includes('--debug')) {
  runtimeDebug.minumumLogLevel = 'Debug'
  runtimeDebug.tracingEnabled = true
  runtimeDebug.traceStackLimit = 100
  // runtimeDebug.filterStackFrame = _ => true
}

const opts: ServerOptions = { dev: true, port: 3000 }

const fastify = await createFastify()

const authConfig = new auth.Config()

await fastify
  .addHook('onRequest', auth.newAuthHook(authConfig))
  // Middlewares
  // Routes
  .get('/api/hello', (req) => {
    const oUserName = Option.fromNullable(req.session.user).map(R.prop('name'))

    return { msg: `hello ${oUserName.getOrElse('anonymous')}` }
  })
  .register(auth.routes(authConfig), { prefix: '/api/auth' })

try {
  await fastify.listen({ port: opts.port })
  console.log('listening on port', opts.port)
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

// fastify.close()

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

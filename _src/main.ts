import { runtimeDebug } from '@effect/data/Debug'
// Fix req.session type
import '@fastify/session'

import * as auth from './auth/index.js'
import { createLiveEdgedb } from './edgedb/index.js'
import { Fastify } from '~/fastify/index.js'

runtimeDebug.traceStackLimit = 50
if (process.argv.includes('--debug')) {
  runtimeDebug.minumumLogLevel = 'Debug'
  runtimeDebug.tracingEnabled = true
  runtimeDebug.traceStackLimit = 100
  // runtimeDebug.filterStackFrame = _ => true
}

const liveFastify = Fastify.createLiveFastify('localhost', 3000)

const liveEdgedb = createLiveEdgedb({
  allow_user_specified_id: true,
})

const services = liveFastify > liveEdgedb

const initFastify = Fastify.accessFastify.tap((fastify) => {
  fastify.addHook('onRequest', auth.newAuthHook(authConfig))
  // Middlewares
  return Effect.unit
})

const authConfig = new auth.Config()

const routes =
  auth.routes(authConfig)({ prefix: '/api/auth' }) >
  Fastify.get('/api/hello', (req) => {
    const oUserName = Option.fromNullable(req.session.user).map(R.prop('name'))

    return Effect.succeed({ msg: `hello ${oUserName.getOrElse('anonymous')}` })
  })

const main = Effect.gen(function* ($) {
  // const apiConfig = yield* $(ApiConfig.config)
  // const cfg = { ...appConfig, ...apiConfig }
  // console.debug(`Config: ${JSON.stringify(cfg, undefined, 2)}`)

  return yield* $(
    Effect.never().scoped.provideLayer(
      services > (initFastify > routes > Fastify.listen).toLayerScopedDiscard,
    ),
  )
})

main.runMain$()

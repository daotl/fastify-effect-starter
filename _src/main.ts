import { runtimeDebug } from '@effect/data/Debug'
// Fix req.session type
import '@fastify/session'

import { Fastify } from '~/fastify/index.js'
import * as auth from '~/auth/index.js'
import { createLiveEdgedb } from '~/edgedb/index.js'

import { ApiConfig, BaseConfig } from './config.js'

runtimeDebug.traceStackLimit = 50
const appConfig = BaseConfig.config.runSync$
if (process.argv.includes('--debug') || appConfig.env === 'local-dev') {
  runtimeDebug.minumumLogLevel = 'Debug'
  runtimeDebug.tracingEnabled = true
  runtimeDebug.traceStackLimit = 100
  // runtimeDebug.filterStackFrame = _ => true
}

const apiConfig = ApiConfig.config.runSync$
const liveFastify = Fastify.createLiveFastify(apiConfig.host, apiConfig.port)

const liveEdgedb = createLiveEdgedb({
  allow_user_specified_id: true,
})

const services = liveFastify > liveEdgedb

const initFastify = Fastify.accessFastify.tap((fastify) => {
  fastify.addHook('onRequest', auth.newAuthHook(authConfig))
  // Middlewares
  return Effect.unit
})

const authConfig = auth.AuthConfig.config.runSync$

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

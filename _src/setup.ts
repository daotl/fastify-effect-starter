import { makeBasicRuntime } from '@daotl-effect/prelude/basicRuntime'
// TODO: Removed, find the alternative
// import { runtimeDebug } from '@effect/data/Debug'
// Fix req.session type
import '@fastify/session'

import * as auth from '~/auth/index.js'
import { createLiveEdgedb } from '~/edgedb/index.js'
import { fa } from '~/fastify/index.js'
import { liveLogger } from '~/logger.js'

import { ApiConfig } from './config.js'

// runtimeDebug.traceStackLimit = 50
// const appConfig = BaseConfig.config.runSync$
// if (process.argv.includes('--debug') || appConfig.env === 'local-dev') {
//   runtimeDebug.minumumLogLevel = 'Debug'
//   runtimeDebug.tracingEnabled = true
//   runtimeDebug.traceStackLimit = 100
//   // runtimeDebug.filterStackFrame = _ => true
// }

export const apiConfig = ApiConfig.config.runSync$
export const liveFastify = fa.createLiveFastify(apiConfig.host, apiConfig.port)

export const liveEdgedb = createLiveEdgedb({
  allow_user_specified_id: true,
})

export const services = liveLogger > liveFastify > liveEdgedb

const { runtime, clean } = Runtime.defaultRuntime.runSync(
  makeBasicRuntime(services),
)
export { runtime, clean }

export const authConfig = auth.AuthConfig.config.runSync$

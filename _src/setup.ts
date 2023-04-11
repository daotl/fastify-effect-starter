import { runtimeDebug } from '@effect/data/Debug'
// Fix req.session type
import '@fastify/session'

import { makeBasicRuntime } from '@daotl-effect/prelude/basicRuntime'

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

export const apiConfig = ApiConfig.config.runSync$
export const liveFastify = Fastify.createLiveFastify(
  apiConfig.host,
  apiConfig.port,
)

export const liveEdgedb = createLiveEdgedb({
  allow_user_specified_id: true,
})

export const services = liveFastify > liveEdgedb

const { runtime, clean } = Runtime.defaultRuntime.runSync(
  makeBasicRuntime(services),
)
export { runtime, clean }

export const authConfig = auth.AuthConfig.config.runSync$

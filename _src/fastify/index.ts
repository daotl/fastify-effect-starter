import { effectify } from '@daotl-effect/fastify'
import type { EffectSchemaTypeProvider } from 'fastify-type-provider-effect-schema'

import { type Logger, logger } from '~/logger.js'

export * from './fastify.js'
import {
  type FastifyContextConfig,
  type FastifyEffectSchemaSchema,
  createFastify,
} from './fastify.js'

const fastify = createFastify({
  pluginTimeout: 0,
  logger,
})
await fastify

export const fa = effectify<
  FastifyContextConfig,
  EffectSchemaTypeProvider,
  FastifyEffectSchemaSchema,
  Logger
>(fastify)

export type FaTypes = typeof fa._types

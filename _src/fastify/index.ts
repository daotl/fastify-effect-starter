import { logger } from '~/logger.js'
import type { EffectSchemaTypeProvider } from 'fastify-type-provider-effect-schema'

export * from './types.js'
export * from './fastify.js'
export * from './effectify.js'

import { effectify } from './effectify.js'
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

export const Fastify = effectify<
  FastifyContextConfig,
  EffectSchemaTypeProvider,
  FastifyEffectSchemaSchema
>(fastify)

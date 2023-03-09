import type * as Fa from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export * from './types.js'
export * from './fastify.js'
export * from './effectify.js'

import { type EffectFastifyPlugin, effectify } from './effectify.js'
import {
  type FastifyContextConfig,
  type FastifyZodSchema,
  createFastify,
} from './fastify.js'

const fastify = createFastify({
  pluginTimeout: 0,
})
await fastify

export const _Fastify = effectify<
  FastifyContextConfig,
  ZodTypeProvider,
  FastifyZodSchema
>(fastify)

export const Fastify = {
  ..._Fastify,
  // To workaround: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
  register: <
    Options extends Fa.FastifyPluginOptions = Record<never, never>,
    // R = never,
  >(
    plugin: EffectFastifyPlugin<
      typeof _Fastify,
      typeof _Fastify['_types']['FastifyApp'],
      Options,
      never
    >,
  ) => _Fastify.register<typeof _Fastify, Options>(plugin),
}

export type Fastify = typeof Fastify

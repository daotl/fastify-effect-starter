import { createClient } from 'edgedb'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import { Config } from './config.js'
import { e } from '~/edgedb/index.js'
import type { Fastify, FastifyNestedRoutes } from '~/fastify/index.js'

const signOutUrl = '/api/hello'

const client = createClient().withConfig({
  allow_user_specified_id: true,
})

export const routes =
  (_config: Config): FastifyNestedRoutes =>
  async (fastify: Fastify, _, done) => {
    await fastify
      .route({
        config: { authLevel: 'public' },
        method: 'GET',
        url: '/signin',
        schema: {
          response: { [StatusCodes.OK]: z.object({ status: z.literal('ok') }) },
        },

        handler: async (req, reply) => {
          if (!req.session.user) {
            const oUser = Option.fromNullable(
              await e
                .select(e.User, () => ({
                  filter_single: { id: new Config().mockUserId },
                  createdAt: true,
                  id: true,
                  name: true,
                  email: true,
                }))
                .run(client),
            )
            oUser.tap((u) => {
              req.session.user = u
              return some(null)
            })
          }
          reply.code(200).send({ status: 'ok' })
        },
      })
      .route({
        config: { authLevel: 'protected' },
        method: 'GET',
        url: '/signout',
        schema: {
          response: {
            [StatusCodes.OK]: z.literal(''),
          },
        },
        handler: (req, reply) => {
          req.session.destroy()
          reply.redirect(signOutUrl)
        },
      })

    done()
  }

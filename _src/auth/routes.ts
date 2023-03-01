import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import type { Fastify, FastifyNestedRoutes } from '~/fastify.js'
import type { User } from '~/models/index.js'

import { type Config } from './config.js'

const signOutUrl = '/api/hello'

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

        handler: (req, reply) => {
          if (!req.session.user) {
            const oUser = some({
              createdAt: new Date(),
              id: '52',
              name: 'Nex',
              email: 'hitnexup@gmail.com',
            } as User)
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

import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

import { Config } from './config.js'
import { e } from '~/edgedb/index.js'
import * as E from '~/edgedb/index.js'
import { Fastify } from '~/fastify/index.js'

const signOutUrl = '/api/hello'

export const routes = (_config: Config) =>
  Fastify.register(
    (_Fastify) =>
      Fastify.route({
        config: { authLevel: 'public' },
        method: 'GET',
        url: '/signin',
        schema: {
          response: {
            [StatusCodes.OK]: z.object({ status: z.literal('ok') }),
          },
        },

        handler: (req, reply) =>
          Effect.gen(function* ($) {
            const edgedb = yield* $(Effect.service(E.tagEdgedb))

            if (!req.session.user) {
              const oUser = Option.fromNullable(
                yield* $(
                  Effect.promise(() =>
                    e
                      .select(e.User, () => ({
                        filter_single: { id: new Config().mockUserId },
                        createdAt: true,
                        id: true,
                        name: true,
                        email: true,
                      }))
                      .run(edgedb),
                  ),
                ),
              )

              oUser.tap((u) => {
                req.session.user = u
                return some(null)
              })
            }
            // Both forms are supported
            reply.code(200) //.send({ status: 'ok' })
            return { status: 'ok' }
          }),
      }) >
      Fastify.route({
        config: { authLevel: 'protected' },
        method: 'GET',
        url: '/signout',
        schema: {
          response: {
            [StatusCodes.OK]: z.literal(''),
          },
        },
        handler: (req, reply) =>
          Effect.gen(function* () {
            req.session.destroy()
            reply.redirect(signOutUrl)
          }),
      }),
  )

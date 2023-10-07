import { StatusCodes } from 'http-status-codes'

import * as E from '~/edgedb/index.js'
import { fa } from '~/fastify/index.js'

import type { AuthConfig } from './config.js'

const signOutUrl = '/api/hello'

export const routes = (cfg: AuthConfig) =>
  fa.register(
    (fa) =>
      fa.route({
        config: { authLevel: 'public' },
        method: 'GET',
        url: '/signin',
        schema: {
          response: {
            [StatusCodes.OK]: Schema.struct({ status: Schema.literal('ok') }),
          },
        },

        handler: (req, reply) =>
          Effect.gen(function* ($) {
            const edgedb = yield* $(E.tagEdgedb)

            if (!req.session.user) {
              const oUser = Option.fromNullable(
                yield* $(
                  Effect.promise(() =>
                    e
                      .select(e.User, () => ({
                        filter_single: { id: cfg.mockUserId },
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
            return { status: 'ok' } as const
          }),
      }) >
      fa.route({
        config: { authLevel: 'protected' },
        method: 'GET',
        url: '/signout',
        schema: {
          response: {
            [StatusCodes.OK]: Schema.literal(''),
          },
        },
        handler: (req, reply) =>
          // biome-ignore lint/correctness/useYield: ignore
          Effect.gen(function* () {
            req.session.destroy()
            reply.redirect(signOutUrl)
          }),
      }),
  )

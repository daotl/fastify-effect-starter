import { z } from 'zod'

import type { Fastify, FastifyNestedRoutes } from '~/fastify.js'
import type * as http from '~/http/index.js'

import { type Config } from './config.js'
import { type Session, SessionCache, sessionIdCookieName } from './session.js'

const signOutUrl = '/'

export const routes =
  (config: Config, sessionCache: SessionCache): FastifyNestedRoutes =>
  async (fastify: Fastify, _, done) => {
    await fastify
      .route({
        // @http.GET('/api/auth/signin').use(authGroup('public'))
        config: { authLevel: 'public' },
        method: 'GET',
        url: '/signin',
        schema: {
          response: z.object({ status: z.literal('ok') }),
        },
        handler: (_req, reply) => {
          const session: Session = { id: config.mockUserId }
          sessionCache.set(session.id, session)
          reply
            .code(200)
            .setCookie(sessionIdCookieName, session.id)
            .send({ status: 'ok' })
        },
      })
      .route({
        // @http.GET('/api/auth/signout').use(authGroup('protected'))
        config: { authLevel: 'protected' },
        method: 'GET',
        url: '/signout',
        handler: (req, reply) => {
          Option.fromNullable(req.requestContext.get('auth'))
            .map(R.prop('session'))
            .map(R.prop('id'))
            .tap((sid) => {
              sessionCache.delete(sid)
              // Remove session ID cookie
              reply.setCookie(sessionIdCookieName, sid, { maxAge: 0 })
              return some(null)
            })
          reply.redirect(signOutUrl)
        },
      })

    done()
  }

import type * as Fa from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import type { Fastify, FastifyNestedRoutes } from '~/fastify.js'
import type * as http from '~/http/index.js'

import { type AuthConfig } from './config.js'
import { type Session, SessionCache, sessionIdCookieName } from './session.js'

const signOutUrl = '/'

export const authRoutes =
  (config: AuthConfig, sessionCache: SessionCache): FastifyNestedRoutes =>
  async (fastify: Fastify, _, done) => {
    await fastify
      .route({
        // @http.GET('/api/auth/signin').use(authGroup('public'))
        config: { authLevel: 'public' },
        method: 'GET',
        url: '/signin',
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
          const session = (req.requestContext as http.Context).session
          if (session) {
            sessionCache.delete(session.id)
            // Remove session ID cookie
            reply.setCookie(sessionIdCookieName, session.id, { maxAge: 0 })
          }
          reply.redirect(signOutUrl)
        },
      })

    done()
  }

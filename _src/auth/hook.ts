import type * as Fa from 'fastify'

import type { FastifyContextConfig } from '~/fastify.js'

import type { Config } from './config.js'
import type { User } from '~/models/index.js'

// onRequest hook
export const newAuthHook =
  (_config: Config): Fa.onRequestHookHandler =>
  (req, reply, done) => {
    // Refresh session
    req.session.touch()

    const authLevel =
      (req.routeConfig as FastifyContextConfig).authLevel ?? 'protected'

    if (
      // Allow access to static files without authentication
      !req.url.startsWith('/api/') ||
      authLevel === 'public'
    ) {
      return done()
    }

    Option.fromNullable(req.session.user).match(
      () => {
        // Deny if auth is not optional
        if (authLevel !== 'optional') {
          reply.code(401).send()
        }
      },
      (u) => {
        req.log.info('Secure API requested by', u.name)
        return some(null)
      },
    )

    done()
  }

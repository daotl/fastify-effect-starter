import type { FaTypes } from '~/fastify/index.js'

import type { AuthConfig } from './config.js'

// onRequest hook
export const newAuthHook =
  (_config: AuthConfig): FaTypes['OnRequestHookHandler'] =>
  (req, reply, done) => {
    // Refresh session
    req.session.touch()

    const authLevel = req.routeOptions.config.authLevel ?? 'protected'

    if (
      // Allow access to static files without authentication
      !req.url.startsWith('/api/') ||
      authLevel === 'public'
    ) {
      return done()
    }

    Option.fromNullable(req.session.user).match({
      onNone() {
        // Deny if auth is not optional
        if (authLevel !== 'optional') {
          reply.code(401).send()
        }
      },
      onSome(u) {
        req.log.info('Secure API requested by', u.name)
        return some(null)
      },
    })

    done()
  }
